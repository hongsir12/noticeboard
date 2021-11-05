import Vue from 'vue'
import {
    DatePicker,
    Table,
    Card,
    Button,
    TableColumn,
    Select,
    Option,
    Input,
    Upload,
    Menu,
    MenuItem,
    Submenu,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Switch,
    Message,
    MessageBox
  } from 'element-ui'

Vue.use(DatePicker)
Vue.use(Table)
Vue.use(Card)
Vue.use(Button)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Switch)

Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox