// node端返回
export function indexPage(html) {
  return `
    <!doctype html>
        <html lang="utf-8">
            <head>
                <meta charset="UTF-8"/>
                <script>
                </script>
            </head>
            <body>
                <section id="root" >${html}</section>
            </body>
            <script src="/static/vendor.bundle.js"></script>
            <script src="/static/app.js"></script>
        </html>
    `
}