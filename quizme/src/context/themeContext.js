import React from "react"
import useLocalStorage from "use-local-storage"

export const ThemeContext = React.createContext()

export const ThemeContextProvider = ({children}) => {

    const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

    const switchTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
    }
    return (
        <ThemeContext.Provider value={{theme, switchTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}