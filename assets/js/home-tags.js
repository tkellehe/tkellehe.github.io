(() => {
  const filterRoot = document.querySelector("[data-tag-filter-root]");
  if (!filterRoot) {
    return;
  }

  const tagButtons = Array.from(filterRoot.querySelectorAll("[data-filter-tag]"));
  const clearButton = filterRoot.querySelector("[data-filter-clear]");
  const visibleCountNode = filterRoot.querySelector("[data-filter-visible]");
  const totalCountNode = filterRoot.querySelector("[data-filter-total]");
  const emptyState = document.querySelector("[data-filter-empty]");
  const posts = Array.from(document.querySelectorAll(".post-list li[data-post-tags]"));

  if (!tagButtons.length || !posts.length) {
    return;
  }

  const validTags = new Set(tagButtons.map((button) => button.dataset.filterTag));
  const selectedTags = readTagsFromQuery(validTags);
  applyFilters();

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.filterTag;
      if (!tag) {
        return;
      }

      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
      } else {
        selectedTags.add(tag);
      }
      applyFilters();
    });
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      selectedTags.clear();
      applyFilters();
    });
  }

  function applyFilters() {
    let visibleCount = 0;

    tagButtons.forEach((button) => {
      const tag = button.dataset.filterTag;
      const isActive = !!tag && selectedTags.has(tag);
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    posts.forEach((post) => {
      const postTags = parsePostTags(post.dataset.postTags || "");
      const isVisible = selectedTags.size === 0 || intersects(postTags, selectedTags);
      post.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (visibleCountNode) {
      visibleCountNode.textContent = String(visibleCount);
    }
    if (totalCountNode) {
      totalCountNode.textContent = String(posts.length);
    }
    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
    if (clearButton) {
      clearButton.hidden = selectedTags.size === 0;
    }

    writeTagsToQuery(selectedTags);
  }
})();

function parsePostTags(rawTags) {
  return new Set(
    rawTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  );
}

function intersects(tagsA, tagsB) {
  for (const tag of tagsA) {
    if (tagsB.has(tag)) {
      return true;
    }
  }
  return false;
}

function readTagsFromQuery(validTags) {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("tags");
  if (!raw) {
    return new Set();
  }

  return new Set(
    raw
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && validTags.has(tag))
  );
}

function writeTagsToQuery(selectedTags) {
  const next = new URL(window.location.href);
  if (selectedTags.size > 0) {
    const sortedTags = Array.from(selectedTags).sort();
    next.searchParams.set("tags", sortedTags.join(","));
  } else {
    next.searchParams.delete("tags");
  }

  const target = `${next.pathname}${next.search}${next.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (target !== current) {
    window.history.replaceState(null, "", target);
  }
}
