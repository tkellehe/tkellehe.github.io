(() => {
  const root = document.querySelector(".experiment-entry[data-chart-data-url]");
  if (!root) {
    return;
  }

  const dataUrl = root.getAttribute("data-chart-data-url");
  if (!dataUrl) {
    return;
  }

  fetch(dataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load chart data: ${response.status}`);
      }
      return response.json();
    })
    .then((payload) => {
      hydrateTokenCharts(payload);
    })
    .catch((error) => {
      console.error(error);
    });
})();

function hydrateTokenCharts(payload) {
  const charts = Array.from(document.querySelectorAll("[data-token-chart][data-model]"));
  if (!charts.length) {
    return;
  }

  const runByModel = buildRunByModel(payload);
  charts.forEach((chart) => {
    const model = chart.getAttribute("data-model");
    const chartKind = chart.getAttribute("data-chart-kind") || "totals";
    const leftKey = chart.getAttribute("data-left-key");
    const rightKey = chart.getAttribute("data-right-key");
    const showNote = chart.getAttribute("data-show-note") === "true";

    if (!leftKey || !rightKey) {
      return;
    }

    const run = runByModel.get(model);
    if (!run || !Array.isArray(run.results)) {
      return;
    }

    const rows = Array.from(chart.querySelectorAll("li[data-doc-size]"));
    const values = rows
      .map((row) => {
        const documentSize = row.getAttribute("data-doc-size");
        const series = calculateChartSeries(run.results, documentSize, chartKind);
        return { row, series };
      })
      .filter((entry) => entry.series);

    if (!values.length) {
      return;
    }

    const maxTokens = Math.max(
      ...values.flatMap((entry) => [entry.series[leftKey], entry.series[rightKey]]),
      1
    );

    values.forEach(({ row, series }) => {
      const leftValue = series[leftKey];
      const rightValue = series[rightKey];
      updateTokenRow(row, "left", leftValue, maxTokens);
      updateTokenRow(row, "right", rightValue, maxTokens);
      if (showNote) {
        updateSavingsNote(row, leftValue, rightValue);
      }
    });
  });
}

function calculateChartSeries(results, documentSize, chartKind) {
  if (chartKind === "savings") {
    return calculateAverageEarlyStopSeries(results, documentSize);
  }
  return calculateAverageTotalsSeries(results, documentSize);
}

function updateTokenRow(sizeRow, seriesName, value, maxTokens) {
  const row = sizeRow.querySelector(`.token-row[data-series="${seriesName}"]`);
  if (!row) {
    return;
  }

  const bar = row.querySelector(".bar");
  const valueNode = row.querySelector(".token-value");
  if (!bar || !valueNode) {
    return;
  }

  const fill = Math.max((value / maxTokens) * 100, 1.5);
  bar.style.setProperty("--fill", `${fill.toFixed(2)}%`);
  valueNode.textContent = formatTokens(value);
}

function updateSavingsNote(sizeRow, baseline, candidate) {
  const noteNode = sizeRow.querySelector("[data-series-note]");
  if (!noteNode) {
    return;
  }
  if (!(Number.isFinite(baseline) && baseline > 0 && Number.isFinite(candidate))) {
    noteNode.textContent = "--";
    return;
  }

  const deltaTokens = baseline - candidate;
  const deltaPct = (Math.abs(deltaTokens) / baseline) * 100;

  if (deltaTokens >= 0) {
    noteNode.textContent = `Saved ${formatTokens(deltaTokens)} tokens (${deltaPct.toFixed(1)}%)`;
  } else {
    noteNode.textContent = `Used ${formatTokens(Math.abs(deltaTokens))} more tokens (+${deltaPct.toFixed(1)}%)`;
  }
}

function calculateAverageTotalsSeries(results, documentSize) {
  const byQuery = new Map();

  results.forEach((row) => {
    if (row.documentSize !== documentSize) {
      return;
    }
    if (row.approach !== "iterative" && row.approach !== "fulltext") {
      return;
    }

    const queryKey = row.query || "__unknown__";
    const existing = byQuery.get(queryKey) || {};
    existing[row.approach] = row.tokensTotal;
    byQuery.set(queryKey, existing);
  });

  const iterative = [];
  const fulltext = [];
  byQuery.forEach((queryRow) => {
    if (Number.isFinite(queryRow.iterative)) {
      iterative.push(queryRow.iterative);
    }
    if (Number.isFinite(queryRow.fulltext)) {
      fulltext.push(queryRow.fulltext);
    }
  });

  if (!iterative.length || !fulltext.length) {
    return null;
  }

  return {
    iterative: average(iterative),
    fulltext: average(fulltext),
  };
}

function calculateAverageEarlyStopSeries(results, documentSize) {
  const byQuery = new Map();

  results.forEach((row) => {
    if (row.documentSize !== documentSize) {
      return;
    }

    const queryKey = row.query || "__unknown__";
    const existing = byQuery.get(queryKey) || {};

    if (row.approach === "fulltext" && Number.isFinite(row.tokensTotal)) {
      existing.fulltext = row.tokensTotal;
    }

    if (row.approach === "iterative" && Number.isFinite(row.tokensToCorrect)) {
      existing.earlystop = row.tokensToCorrect;
    }

    byQuery.set(queryKey, existing);
  });

  const paired = [];
  byQuery.forEach((queryRow) => {
    if (Number.isFinite(queryRow.fulltext) && Number.isFinite(queryRow.earlystop)) {
      paired.push(queryRow);
    }
  });

  if (!paired.length) {
    return null;
  }

  return {
    fulltext: average(paired.map((row) => row.fulltext)),
    earlystop: average(paired.map((row) => row.earlystop)),
  };
}

function buildRunByModel(payload) {
  const runs = Array.isArray(payload.runs) ? payload.runs : [];
  return new Map(runs.map((run) => [run.model, run]));
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatTokens(value) {
  return Math.round(value).toLocaleString("en-US");
}
