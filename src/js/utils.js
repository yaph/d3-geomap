export function addAccessor(obj, name, value) {
    obj[name] = (_) => {
        if (typeof _ === 'undefined')
            return obj.properties[name] || value;
        obj.properties[name] = _;
        return obj;
    };
}
