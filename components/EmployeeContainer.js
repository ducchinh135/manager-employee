import { BaseComponent } from "../BaseComponent.js";
import { getDataFromDoc } from "../utils.js";
const style = /*html*/`
<style>
    * {
        font-family: 'Baloo 2', cursive;
        font-size: 20px;
    }

    .empl-container {
        border: 1px solid #4F6457;
        background-color: white;
        border-radius: 5px;
        margin-top: 10px;
    }

    .empl-info {
        padding: 5px 10px;
        border-bottom: 1px solid #4F6457;
    }

    .empl-content {
        padding: 10px;
    }

    .date {
        font-size: 15px;
        color: #D9B44A;
    }

    .owner {
        color: #75B1A9;
    }
</style>
`;
class StoryContainer extends BaseComponent {
    constructor() {
        super();

        this.state = {
            name: ''
        }

        this.props = {
            "id": '',
            "name": '',
            "age": '',
            "date": ''
        };
    }

    static get observedAttributes() {
        return ['id', 'name', "age", "date"];
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/`
            ${style}
            <div class="empl-container">

                <div class="empl-info">
                    <div class="empl">${this.state.name}</div>
                    <div class="date">${this.props.date}</div>
                </div>

                <div class="empl-content">
                    name : ${this.props.name}
                    age : ${this.props.age}
                </div>

            </div>
        `;
    }

    async componentDidUpdate() {
        if (this.props.owner) {
            let response = await firebase
                .firestore()
                .collection('Employee')
                .doc(this.props.owner)
                .get();
            let owner = getDataFromDoc(response);
            this.setState({
                name: owner.name
            })
        }
    }
}

window.customElements.define('empl-container', StoryContainer);