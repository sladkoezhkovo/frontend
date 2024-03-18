import {defineStyleConfig, extendTheme} from '@chakra-ui/react'

const baseStyle = {
    borderRadius: 'md', // add a border radius
    fontWeight: 'medium', // change the font weight
    maxW: "container.xl",
    py: "12px",
}

export const containerTheme = defineStyleConfig({ baseStyle })
export const buttonTheme = defineStyleConfig({
    baseStyle: {
        shadow: "md",
    },
})

const theme = extendTheme({
    components: {
        Container: containerTheme,
        Button: buttonTheme,
    },
})

export default theme