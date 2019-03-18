
	// const testData = [
	// 		{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "facebook"},
	// {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
	// {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	// ];


// a component that represents a single Card
class Card extends React.Component {
	render() {
  // this here refers to an instance of Card Component
  	const profile = this.props;
  	return (
    <div className="github-profile">
    	<img src={profile.avatar_url} />
      <div className="info">
      	<div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
    );
  }
}

// a component that represents the list
// here we create an instance from the component 
// <Card {...testData[0]}/>
const CardList = (props) => (
	<div>
		{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
);

// user input
class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
		const resp = await 
axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input 
        	type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Github username"
          required/>
        <button> Add Card </button>
      </form>
    );
  }
}

// class component
class App extends React.Component {
	// constructor
  constructor(props) {
  	super(props); // has to have this, and need pass props.
    this.state = {
    	profiles: [],
    };
  }
  
  // callback function
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData]
    }))
  };
  // this keyword
  render() {
  	return (
    <div>
      <div className="header">{this.props.title}</div>
      <Form onSubmit={this.addNewProfile}/>
      <CardList profiles={this.state.profiles}/>
    </div>
    );
  }
}
// const App = ({title}) => (
//   <div className="header">{title}</div>
// );

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
