function addAccessor(obj, name, value) {
    obj[name] = (_) => {
        if (!arguments.length)
            return obj.properties[name] || value;
        obj.properties[name] = _;
        return obj;
    };
}
