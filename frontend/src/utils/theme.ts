import { createTheme } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
    interface Palette {
        third: {
            main: string;
        };
        fourth: {
            main: string
        }
    }

    interface PaletteOptions {
        third?: {
            main?: string;
        };
        fourth?: {
            main: string
        }
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#F3F8FF"
        },
        secondary: {
            main: "#E26EE5"
        },
        third: {
            main: "7E30E1"
        },
        fourth: {
            main: '#49108B'
        }
    },
});

export default theme;