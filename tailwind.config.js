module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'crimson': '#DC143C'
            },
            animation: {
                animationShowMenu: 'showMenu 0.5s ease-in forwards',
            },
            transitionProperty: {
                height: 'height'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}