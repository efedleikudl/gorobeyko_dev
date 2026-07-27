const languageRedirect = `
  (function () {
    try {
      var langs = navigator.languages
      var primary = (langs && langs[0]) || navigator.language || "en"
      var locale = primary.toLowerCase().indexOf("de") === 0 ? "de" : "en"
      var path = window.location.pathname
      if (path.charAt(path.length - 1) !== "/") path += "/"
      window.location.replace(path + locale + "/")
    } catch (e) {}
  })();
`

export default function LanguageRedirectPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: languageRedirect }} />
      <noscript>
        <main className="language-redirect">
          <div>
            <p>Choose a language / Sprache wählen</p>
            <div className="language-redirect-links">
              <a href="./en/" hrefLang="en" lang="en">
                English
              </a>
              <a href="./de/" hrefLang="de" lang="de">
                Deutsch
              </a>
            </div>
          </div>
        </main>
      </noscript>
    </>
  )
}
