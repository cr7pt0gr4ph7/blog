(function () {
    var $root = document.getElementsByClassName('root')[0];
    if (window.hasEvent('touchstart')) {
        $root.dataset.isTouch = true;
        document.addEventListener('touchstart', function () { }, false);
    }
})();
(function () {
    document.querySelectorAll('.sample-preview[data-sample-id]').forEach(el => {
        const sampleId = el.getAttribute("data-sample-id");

        const collectCode =
            langTag =>
                Array.from(document.querySelectorAll(`.language-${langTag}[data-sample-id~="${sampleId}"]`))
                    .map(codeBlock => codeBlock.textContent ?? "")
                    .join("\n");

        const html = collectCode("html");
        const css = collectCode("css");
        const js = "";

        const iframeContainer = document.createElement("div");
        iframeContainer.classList.add("iframe-container");
        el.appendChild(iframeContainer);

        const iframe = document.createElement("iframe");
        iframeContainer.appendChild(iframe);

        const code = iframe.contentWindow.document;
        code.open();
        code.writeln(`${html}\u003Cstyle\u003E${css}\u003C/style\u003E\u003Cscript type="text/javascript"\u003E${js}\u003C/script\u003E`);
        code.close();
    });
})();
