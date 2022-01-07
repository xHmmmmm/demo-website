export const sections = [
    {
        id: 'home-page',
        label: "Home"
    },
    {
        id: 'gallery-page',
        label: "Gallery"
    },
    {
        id: 'news-page',
        label: "News"
    },
    {
        id: 'products-page',
        label: "Products"
    }
]

export function scrollToSection(id)
{
    const element = document.getElementById(id)
    element.scrollIntoView()
}