addAccessor = (obj, name, value)->
    obj[name] = (_)->
        if not arguments.length
            return value
        obj.properties[name] = _
        obj