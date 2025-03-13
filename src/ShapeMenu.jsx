function RadioMenuItem({selectedType, setSelectedType, type, label}) {
    const id = `tool-${type}`
    return (
        <div>
            <label htmlFor={id} className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white">
                <input name="tool" id={id} type="radio" className="sr-only" checked={selectedType === type} onChange={()=>setSelectedType(type)} />
                <p className="text-sm font-medium">{label}</p>
            </label>
        </div>
    )
}

function ShapeMenu({selectedType, setSelectedType}) {
    return (
        <fieldset className="flex flex-wrap gap-3">
            <legend className="sr-only">Tools</legend>
            <RadioMenuItem selectedType={selectedType} setSelectedType={setSelectedType}
                type="line"
                label="Line"
            />
            <RadioMenuItem selectedType={selectedType} setSelectedType={setSelectedType}
                type="rect"
                label="Rect"
            />
            <RadioMenuItem selectedType={selectedType} setSelectedType={setSelectedType}
                type="ellipse"
                label="Ellipse"
            />
            <RadioMenuItem selectedType={selectedType} setSelectedType={setSelectedType}
                type="arrow"
                label="Arrow"
            />
            <div className="flex items-center">
                <p>Save the image by using clicking with left button and use your browser save image feature.</p>
            </div>
        </fieldset>
    );
}

export default ShapeMenu;