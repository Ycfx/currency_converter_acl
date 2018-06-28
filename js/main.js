
import Select from '../libs/select/select.min.js'

new Select('#from-select',{
    filtered: 'auto',
    filter_threshold: 8,
    filter_placeholder: 'Filter'
});
new Select('#to-select',{
    filtered: 'auto',
    filter_threshold: 8,
    filter_placeholder: 'Filter'
});