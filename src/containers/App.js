import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import {robots} from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import {setSearchField, requestRobots} from '../actions';
import Header from '../components/Header';
const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
	onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
	onRequestRobots: () => dispatch(requestRobots())
	}
}


class App extends Component {
	
	componentDidMount(){
		this.props.onRequestRobots();
	}
	
	render(){
		//const {robots}= this.state;
		const {searchField,onSearchChange,robots,isPending} =this.props;
		//const {robots,searchfield} =this.state; //destructing (removing this.state )
		const filterRobots =robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
	return isPending ?
	<h1>Loading</h1>:
	 (
		<div className='tc'>
			<Header />
			<SearchBox searchChange={onSearchChange}/>
			<Scroll>
			<ErrorBoundry>
				<CardList robots={filterRobots}/>
			</ErrorBoundry>
			</Scroll>
		</div>
		);

}
}
export default connect(mapStateToProps,mapDispatchToProps)(App);