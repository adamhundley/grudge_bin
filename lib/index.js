const React = require('react');
const ReactDOM = require('react-dom');

class GrudgeBin extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <h1>Hello World</h1>
    );
  }

}


class ListGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      offense: "",
      forgiven: false,
    };
  }

  updateGrudge(e) {
    debugger
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="ListGrudge">
        <input className="ListGrudge-name"
              name="name"
              placeholder="Grude Name"
              value={this.state.name}
              onChange={(e) => this.updateGrudge(e)}
          /><br/><br/>
        <textarea className="ListGrudge-body"
                    name="body"
                    placeholder="Body"
                    value={this.state.offense}
                    onChange={(e) => this.updateGrudge(e)}
          /><br/><br/>
        <input type="checkbox"
               name="forgiven"
               value="forgiven"
               onChange={(e) => this.updateGrudge(e)}
               />Forgiven?<br/>

        <input className="ListGrudge-submit"
               type="submit"
              onClick={(e) => this.createIdea(e)}
          />
      </div>
    );
  }
}


ReactDOM.render(<GrudgeBin title="Grudge Bin" />, document.querySelector('.application'));
ReactDOM.render(<ListGrudge title="Grudge Bin" />, document.querySelector('.application'));
