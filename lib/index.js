const React = require('react');
const ReactDOM = require('react-dom');
const bin = require('./bin');

class GrudgeBin extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: bin.all(),
    };
  }

  componentDidMount(){
    bin.on('change', grudges => {
      this.setState({ grudges });
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>{this.props.title}</h1>
          <GrudgesCount/>
          <CreateGrudge/>
          <GrudgesList grudges={this.state.grudges}/>
        </header>
      </div>
    );
  }
}

class CreateGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      person: '',
      wrong: '',
    };
  }

  updateProperties(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  createGrudge(e) {
    e.preventDefault();
    bin.create(this.state);
    this.setState({ person: '',
                    wrong: '' });
  }

  render() {
    return (
      <div>
        <input name="person"
               placeholder="Who dey?"
               value={this.state.person}
               onChange={(e) => this.updateProperties(e)}/><br/>
        <textarea name="wrong"
                  placeholder="What dey do?"
                  value={this.state.wrong}
                  onChange={(e) => this.updateProperties(e)}/><br/>
        <input name="submit"
               type="submit"
               onClick={(e) => this.createGrudge(e)}/>
      </div>
    );
  }
}

const GrudgesList = (props) => {
  const grudges = props.grudges;
  return (
    <div>
      {grudges.map( grudge => <GrudgeListItem {...grudge} key={grudge.id}/>)}
    </div>
  )
}

function isForgiven(forgiven, id) {
  if (forgiven === false ) {
    return <button onClick={() => bin.forgive(id)}>Forgive?!</button>
  } else {
    return "FORGIVEN....NOT FORGOTTEN!"
  }
}

const GrudgeListItem = ({id, person, wrong, forgiven }) => {
  let forgiveButton = isForgiven(forgiven, id)
  return (
    <div>
      <h3>{person}</h3>
      <div>{wrong}</div>
      {forgiveButton}
    </div>
  )
}

const GrudgesCount = () => {
  let totalCount = bin.all().length;
  let forgivenCount = bin.forgiven();
  let unforgivenCount = bin.unforgiven();
  return (
    <section>
      <div>Total Grudges: {totalCount}</div>
      <div>Forgiven Grudges: {forgivenCount}</div>
      <div>Unforgiven Grudges: {unforgivenCount}</div>
    </section>
  )
}

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
