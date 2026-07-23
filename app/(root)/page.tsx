const languageRedirect = `
  (() => {
    const primaryLanguage = navigator.languages?.[0] || navigator.language || "en";
    const locale = primaryLanguage.toLowerCase().startsWith("de") ? "de" : "en";
    const basePath = window.location.pathname.endsWith("/")
      ? window.location.pathname
      : window.location.pathname + "/";

    window.location.replace(basePath + locale + "/");
  })();
`

export default function LanguageRedirectPage() {
  return (
    <main className="language-redirect">
      <script dangerouslySetInnerHTML={{ __html: languageRedirect }} />
      <div>
        <p>Choose a language / Sprache wählen</p>
        <div className="language-redirect-links">
          <a href="./en/" hrefLang="en" lang="en">English</a>
          <a href="./de/" hrefLang="de" lang="de">Deutsch</a>
        </div>
      </div>
    </main>
  )
}
