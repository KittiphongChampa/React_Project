export default function inputSetting(name, headding, type, pattern,  required = true, min=null, dis = false, max=null) {
    return (
        {
            name:name,
            headding: headding,
            type: type,
            pattern: pattern,
            required: required,
            minLength: min,
            disabled: dis,
            maxLength:max,
            
        }
    )
}