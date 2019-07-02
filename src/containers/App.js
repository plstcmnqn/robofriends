import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import {robots} from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
class App extends Component {
	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}
	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users=> this.setState({robots: users}));
		
	}
	onSearchChange= (event) => {
		
		this.setState({searchfield: event.target.value})
		//console.log(event.target.value);
		
		//console.log(filterRobots);
	}
	render(){
		//const {robots,searchfield} =this.state; //destructing (removing this.state )
		const filterRobots =this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
	return (
		<div className='tc'>
		<h1 className='f2'>RoboFriends</h1>
		<SearchBox searchChange={this.onSearchChange}/>
		<Scroll>
		<ErrorBoundry>
		<CardList robots={filterRobots}/>
		</ErrorBoundry>
		</Scroll>
		</div>
		);

}
}
export default App;