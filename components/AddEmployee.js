import { BaseComponent } from "../BaseComponent.js";
import { getCurrentUser } from "../utils.js";
const style = `
<style>
form {
    display: flex;
    flex-direction: column;
    max-width: 20%;
    margin-top: 20px;
    margin-left: 20px;
}

form input, .btn {
    margin-top: 12px;
}
</style>
`;

class FormAdd extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/`
            ${style}
            <form class="form-add">
        <input type="text" placeholder="Nhập name" name="name">
        <input type="text" placeholder="Nhập age" name="age">
        <button class="btn" id="addUser">ADD</button>
        </form>
        `;

        this.$formAdd = this._shadowRoot.querySelector('.form-add');
        this.$formAdd.onsubmit = async (event) => {
            event.preventDefault();
            // lấy dữ liệu
            let name = this.$formAdd.name.value.trim();
            let age = this.$formAdd.age.value.trim();
            console.log(name)

            // kiểm tra dữ liệu
            if (name == '' || age == '') {
                alert("Vui lòng nhập đủ thông tin!");
            } else {
                let currentUser = getCurrentUser();
                // thêm dữ liệu vào firestore
                await firebase.firestore().collection('Employee').add({
                    name: name,
                    age: age,
                    owner: currentUser.id,
                    date: new Date().toISOString()
                });

                this.$formAdd.reset();
            }

        }
    }
}

window.customElements.define('form-add', FormAdd);