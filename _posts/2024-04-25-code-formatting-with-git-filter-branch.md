---
layout: article
title: How to apply a code formatter to a Git history
tags: ["Git","Git Magic"]
permalink: /articles/code-formatting-with-git-filter-branch/
article_header:
  type: overlay
  theme: dark
  background_color: "#363649"
  background_image:
    src: assets/img/posts/2024-02/pexels-jessica-lewis-thepaintedsquare-583847.jpg
    alignment: 61%
---

Imagine that you have written, prepared and rebased a beautiful Git history with multiple commits
for a pull request to an open source project -- just to discover that you forgot to apply the code formatter
to your newly added code, making it non-compliant with the requirements of the upstream project.

Fortunately, as long as your pull request has not been merged, there is a way
to retroactively format the code of each of your commits using [`git filter-branch`]
and the code formatter of your choice -- at least when the project is using the [`pre-commit`]
tool with auto-fixing enabled.

{:.error}
**Caution advised:**
`git filter-branch` is a command that is both very powerful, and also quite dangerous if handled wrong.
Git _does_ try to prevent you from shooting yourself in the foot as good as it can,
but it can't prevent badly written custom scripts from accidentally doing `rm -rf .git` or `rm -rf /`,
removing or modifying the wrong files etc.

## Getting started: Basic usage

**TL;DR:** The following snipped will apply `pre-commit` to each commit as if it was just being committed:

```bash
git filter-branch --tree-filter "pre-commit run || true" -- main..HEAD
```

`git filter-branch` is a [relatively simple (but very powerful if used correctly) shell script][git-filter-branch.sh] included with Git.
For each commit between `main` (exclusive) and `HEAD` (inclusive), it will:
1. Checkout[^1] the contents of that commit.
2. Invoke the command specified by `--tree-filter`.
   In our case, that invokes [`pre-commit run`], which, when configured correctly through a `.pre-commit-config.yaml` file, will:
   * Get a list of all files that have changed.
   * Invoke each hook configured in `.pre-commit-config.yaml` with the list of changed files.

     In the case of our example project, this will apply a code format checker to all changed files.
     When it finds code format problems, it autoformats the problematic files, and returns a non-zero exit code.
     The `|| true` is used to ignore the non-zero exit code; otherwise, `git filter-branch` thinks that the command failed and exits failed.
3. Add all files that were changed by the `--tree-filter` command to the staging area.
4. Append the result as a new commit to the rewritten Git history.

[^1]: Note that what `git filter-branch` does is subtly different from a normal `git checkout`. The index (aka. staging area) and working directory will match the state as of that commit, but `HEAD` will not be updated.

[^2]: The [project][mixxx] that caused this article to be written
even goes a step further and formats *only those lines that were actually changed* using a [custom Python script][clang-format.py] and `clang`.

## Listing the changes using `git diff`

We can improve upon this by showing how the contents of each commit have changed due to the code formatting.
For this, we need to slightly modify our `git filter-branch` command, such that it looks like this:

```bash
git filter-branch --tree-filter "pre-commit run || true" --state-branch git-rewrite-state -- main..HEAD
```

The `--state-branch` will store the mapping file from old commit ids to new commit ids as a commit in the repository,
on a separate branch (which, in our case, will be named `git-rewrite-state`.
The mapping file can be viewed using the CLI:

```bash
❯ git cat-file -p git-rewrite-state:filter.map
0220c3fafb0650b8a29f27a0c69bffcbbb038ca1:294f62bebc0076700e968b56d0a7e2f094d73c55
069a549d46b60fbbb45e5948ddc02a63455af5f1:c935a14a50c576bf2729f7ed70cf462a6a19610e
0f1d4fdab9fb100d3eaefc90f82df2e1541ad279:a5c9735aa000ffc72a7217d72b4727a6915be8e1
1d62e0d2ac050b75e5837034559273bf0b20012b:7fc52f8d2c4e399fccb9e9c7878c3277a890f57e
... [truncated for brevity]
```

We can feed this mapping information into [`git range-diff`] to show the differences between the original and the reformatted commits:

```bash
git cat-file -p git-rewrite-state:filter.map | while read oldnewrefline
do
  IFS=':' read -ra oldnewref <<< "$oldnewrefline"
  oldref=${oldnewref[0]}
  newref=${oldnewref[1]}
  git range-diff $oldref^..$oldref $newref^..$newref
done
```

<details markdown="1">
<summary>Example output (truncated)</summary>
<div class="boilerplate-content" markdown="block">
```diff
1:  0220c3fafb = 1:  294f62bebc StarDelegate: Fix: Ensure consistency of commitAndCloseEditor with QAbstractItemDelegatePrivate::_q_commitDataAndCloseEditor
1:  069a549d46 = 1:  c935a14a50 WTrackTableView: Add WTrackTableView::editRequested signal
1:  0f1d4fdab9 ! 1:  a5c9735aa0 StarDelegate: Fix: Transition from "mouse edit mode" to "keyboard edit mode"
    @@ src/library/tabledelegates/stardelegate.cpp: void StarDelegate::commitAndCloseEd
     +    // This slot is called when an edit is requested for ANY cell on the
     +    // QTableView but the code should only be executed on a column with a
     +    // StarRating.
    -+    if (trigger == QAbstractItemView::EditTrigger::EditKeyPressed
    -+        && m_isPersistentEditorOpen
    -+        && index.data().canConvert<StarRating>()
    -+        && m_currentEditedCellIndex == index) {
    ++    if (trigger == QAbstractItemView::EditTrigger::EditKeyPressed &&
    ++            m_isPersistentEditorOpen && index.data().canConvert<StarRating>() &&
    ++            m_currentEditedCellIndex == index) {
     +        // Close the (implicit) persistent editor for the current cell,
     +        // so that a new explicit editor can be opened instead.
     +        closeCurrentPersistentRatingEditor();
1:  1d62e0d2ac = 1:  7fc52f8d2c WTrackTableView: Add WTrackTableView::getCurrentEditTrigger
1:  281c4f96a3 = 1:  97fc9c22bf StarDelegate: Rename m_isOneCellInEditMode to m_isPersistentEditorOpen
1:  34786f46a7 = 1:  d2deffcc2d Add FIXME comment.
1:  3b8378c0db ! 1:  bf1fd26675 StarDelegate: Fix: Restore "mouse edit mode" when exiting "keyboard edit mode"
    @@ src/library/tabledelegates/stardelegate.cpp: void StarDelegate::commitAndCloseEd
      void StarDelegate::editRequested(const QModelIndex &index, QAbstractItemView::EditTrigger trigger, QEvent *event) {
          Q_UNUSED(event);
      
    -@@ src/library/tabledelegates/stardelegate.cpp: void StarDelegate::editRequested(const QModelIndex &index, QAbstractItemView::Ed
    +     // This slot is called when an edit is requested for ANY cell on the
          // QTableView but the code should only be executed on a column with a
          // StarRating.
    -     if (trigger == QAbstractItemView::EditTrigger::EditKeyPressed
    --        && m_isPersistentEditorOpen
    +-    if (trigger == QAbstractItemView::EditTrigger::EditKeyPressed &&
    +-            m_isPersistentEditorOpen && index.data().canConvert<StarRating>() &&
    +-            m_currentEditedCellIndex == index) {
    ++    if (trigger == QAbstractItemView::EditTrigger::EditKeyPressed
     +        && m_persistentEditorState == PersistentEditor_Open
    -         && index.data().canConvert<StarRating>()
    -         && m_currentEditedCellIndex == index) {
    ++        && index.data().canConvert<StarRating>()
    ++        && m_currentEditedCellIndex == index) {
              // Close the (implicit) persistent editor for the current cell,
              // so that a new explicit editor can be opened instead.
     -        closeCurrentPersistentRatingEditor();
    @@ src/library/tabledelegates/stardelegate.h: class StarDelegate : public TableItem
     +    void restorePersistentRatingEditor(const QModelIndex& index);
     +
     +    enum PersistentEditorState {
    -+      PersistentEditor_NotOpen,
    -+      PersistentEditor_Open,
    -+      PersistentEditor_ShouldRestore
    ++        PersistentEditor_NotOpen,
    ++        PersistentEditor_Open,
    ++        PersistentEditor_ShouldRestore
     +    };
     +
     +    QPersistentModelIndex m_persistentEditorCellIndex;
1:  61fbf112dc = 1:  321c10700b WTrackTableView: Add WTrackTableView::viewportLeaving signal
1:  73064b52d5 ! 1:  fb5fcd0d76 Add FIXME comment.
    @@ src/library/tabledelegates/stareditor.cpp: QSize StarEditor::sizeHint() const {
          m_styleOption.state |= QStyle::State_MouseOver;
          m_styleOption.rect = rect();
1:  7ea3e5ccba = 1:  f88763f02b StarDelegate: Fix: Detect all cases where the mouse leaves the editor control
1:  83d48dfe67 = 1:  043d180844 StarEditor: Add keyboard controls for editing
1:  86738bd226 = 1:  af4cfc8279 StarDelegate: Fix: Workaround for bug of closePersistentEditor
1:  a28f669d2f ! 1:  1124e6301e StarDelegate: Restore persistent editor on commit.
    @@ src/library/tabledelegates/stardelegate.h: class StarDelegate : public TableItem
     +    void restorePersistentRatingEditor(const QModelIndex& index);
     +
     +    enum PersistentEditorState {
    -+      PersistentEditor_NotOpen,
    -+      PersistentEditor_Open,
    -+      PersistentEditor_ShouldRestore
    ++        PersistentEditor_NotOpen,
    ++        PersistentEditor_Open,
    ++        PersistentEditor_ShouldRestore
     +    };
     +
          QPersistentModelIndex m_currentEditedCellIndex;
1:  a6912a1138 ! 1:  905f5ae3fd Fix comment.
    @@ src/library/tabledelegates/stareditor.cpp: void StarEditor::paintEvent(QPaintEve
          if (m_styleOption.state & QStyle::State_HasFocus) {
              TableItemDelegate::drawBorder(&painter, m_focusBorderColor, m_styleOption.rect);
          }
1:  aec2c3a767 ! 1:  6a1d98bba8 StarEditor: Fix: Work around race condition of MousePressed/MouseReleased vs. focus handling
    @@ src/library/tabledelegates/stareditor.h: class StarEditor : public QWidget {
     +    int m_deferredStarCount;
          bool m_isKeyboardEditMode;
      };
```
</div>
</details>

## Bonus: Custom code formatting tools

You can still employ `git filter-branch` even if you do not use the `pre-commit` tool.
The only requirement is that you have a custom that accepts a list of files to format
either via stdin, or as command line arguments, and writes the formatted files back
to their original locations.

Your `--tree-filter` should then look something like this, either inline or wrapped into a shell script file:

```bash
# Pass the list of changed files via stdin
git diff --staged --name-only --no-ext-diff --diff-filter=ACMRTUXB | your_code_formatter

# Pass the list of files as command line arguments
mapfile changed_files < <(git diff --staged --name-only --no-ext-diff --diff-filter=ACMRTUXB)
your_code_formatter "${changed_files[@]}"
```

Enjoy!

[`git range-diff`]: https://git-scm.com/docs/git-range-diff
[`git filter-branch`]: https://git-scm.com/docs/git-filter-branch
[git-filter-branch.sh]: https://github.com/git/git/blob/v2.44.0/git-filter-branch.sh
[`pre-commit`]: https://pre-commit.com/
[`pre-commit run`]: https://pre-commit.com/#pre-commit-run
[clang-format.py]: https://github.com/mixxxdj/mixxx/blob/67a41d9dcdb06b37f57be8e88978756140d05ff2/tools/clang_format.py
[mixxx]: https://github.com/mixxxdj/mixxx
