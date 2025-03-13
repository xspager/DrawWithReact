function MenuItem({color, setColor, type}) {
    return (
        <input type="color" className="h-10 w-10" value={color} onChange={(event) => setColor(event.target.value)} />
    )
}

function ColorMenu({backgroundColor, setBackgroundColor, foregroundColor, setForegroundColor}) {
    return (
    <nav className="fixed m-2">
        <fieldset className="flex flex-wrap gap-3">
            <legend className="sr-only">Colors</legend>
            <MenuItem color={backgroundColor} setColor={setBackgroundColor} type="background-color" />
            <MenuItem color={foregroundColor} setColor={setForegroundColor} type="foreground-color" />
        </fieldset>
    </nav>
    )
}

export default ColorMenu;