import React,{Component, useState} from'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../style.css';

const Filterlist = props =>(
    
    
    <tr>
        <td>{props.data.userName}</td>
        <td>{props.data.timestamp}</td>
        <td>{props.data.message}</td>
        <td>{props.data.chat}</td>
        <td>

            <a href="#" onClick={()=>{props.deleteRoom(props.data._id)}}>Delete</a>
    
        </td>

    </tr>
)
export default class FilterHistory extends Component{
    constructor(props){
    super(props);
    this.state ={
        history: [],
        rooms: ['test']
    };
    }
    componentDidMount(){
        axios.get('https://comp3133-chat-app.herokuapp.com/dashboard/history/').then(res =>{
            this.setState({history: res.data})
            console.log(this.state.room);
        }).catch((error) =>{
            console.log(error)
        });
        
        
    }
    deleteRoom(id){
        
        axios.delete('https://comp3133-chat-app.herokuapp.com/dashboard/history/'+id).then(res => console.log(res.data));
        //this.setState({
            //events: this.state.events.filter(el => el._id !== id)
        //});
        console.log(this.history)
    }
    filterList(){
        return this.state.history.map(historydata =>{
            return <Filterlist data={historydata} deleteRoom={this.deleteRoom} key={historydata._id}/>
        })
    }
    render(){
        return(
            <div>
            <form>
            {/* <select ref="rooms" required value={this.state.rooms} on onChange={this.onChangeRoom}>
                    {this.state.rooms.map(function(room){<option key={room} value={room}>{room}</option>})}
                </select> */}
            </form>
                <h1>history</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.filterList()}
                    </tbody>
                </table>
            </div>
        )
    }
}