const createLink = (() => {
    let $link = null
    return () => {
        if ($link) {
            return $link
        }
        $link = document.createElement('link')
        $link.ref = 'stylesheet'
        document.querySelector('head').appendChild($link)
        return $link
    }
})()



const toggleTheme = (theme) => {
    if (theme === window.currentThemeLink && window.currentThemeLink.dataset.theme) {
      return
    }
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `./themes.${theme}.css`
    themeLink.dataset.theme = theme;
    document.head.appendChild(themeLink);
    themeLink.onload = () => {
        window.currentThemeLink.parentNode.removeChild(window.currentThemeLink)
        window.currentThemeLink = themeLink
    }
}

window.toggleTheme = toggleTheme
toggleTheme('blue')

