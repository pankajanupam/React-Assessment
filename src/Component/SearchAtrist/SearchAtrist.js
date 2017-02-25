import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import $ from 'jquery';
import './SearchAtrist.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

export default class SearchAtrist extends Component {
        
  constructor(props) {
    super(props);
    
    this.state = {artists: []};

    // form event binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // fetch artists data and set to local state
  fetchArtists(searchString) {
        // hit spotify api to get search restult 
        $.get( "https://api.spotify.com/v1/search", {query:searchString, type:"artist",market:"US", offset:0, limit:20 } ).then((data) => {
            console.log(data);
            this.setState({ artists: data.artists.items });
        });
  }
  
  // update the state value no change
  onChange(event) {
    // check is search string set
    if(event.target.value.length > 0){
        this.fetchArtists(event.target.value)
    }else{
        // reset state artist if no search string
        this.setState({ artists: [] });
    }
  }

  // prevent from default submit
  onSubmit(event) {
    event.preventDefault();
  }
  

  render() {
    
    return (
        <div className="row">
            <div className="col-sm-12 header-col">
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <label className="col-lg-4">
                      <input type="text" className="form-control" placeholder="Enter a artist name e.g. muse"  onChange={this.onChange} />
                    </label>
                    <input type="submit" className="btn btn-primary" value="Search" />
                </form>
            </div>
            <div className="col-sm-12 table-col">
                <BootstrapTable data={this.state.artists}>
                    <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='popularity'>Popularity</TableHeaderColumn>
                    <TableHeaderColumn dataField='genres'>Genres</TableHeaderColumn>
                </BootstrapTable>
            </div>
        </div>
    );
  }
}