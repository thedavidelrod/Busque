import React from "react";
import VenueIndexItem from "./venue_index_item";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "../searchbar/searchbar";

class VenueIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchVenues();
  }

  // <<<<<<< HEAD
  //   render() {
  //     return (
  //       <div>
  //         <div className="user-header-container">
  //           <div className="user-search-container">
  //             <div className="user-search">
  //               <Searchbar
  //                 venues={this.props.venues}
  //                 openModal={this.props.openNavModal}
  //               />
  // =======
  render() {
    return (
      <div>
        <div className="venue-header-container">
          <div className="user-header">
            <GiHamburgerMenu
              size={25}
              onClick={() => {
                this.props.openNavModal();
              }}
              className="menu-icon-other"
            />
          </div>
          <div className="venue-header-center">
            <h1 className="venue-header-h1">Our Top Venues</h1>
          </div>
        </div>
        {this.props.venues.map((venue, i) => {
          return (
            <VenueIndexItem
              venue={venue}
              users={this.props.users}
              comments={this.props.comments}
              isAuthenticated={this.props.isAuthenticated}
              currentUser={this.props.currentUser}
              createComment={this.props.createComment}
              fetchVenueComments={this.props.fetchVenueComments}
              createVenueRating={this.props.createVenueRating}
              fetchVenueRatings={this.props.fetchVenueRatings}
              ratings={this.props.ratings}
              key={i}
            />
          );
        })}
        {/* >>>>>>> cf556629f71a37db1c6ddac5e836b48dcdb62373 */}
      </div>
      // </div>

      //   <div className="user-header">
      //     <h1>Our Venues</h1>
      //   </div>
      // </div>
      // {this.props.venues.map((venue, i) => {
      //   return (
      //     <VenueIndexItem
      //       venue={venue}
      //       users={this.props.users}
      //       comments={this.props.comments}
      //       isAuthenticated={this.props.isAuthenticated}
      //       currentUser={this.props.currentUser}
      //       createComment={this.props.createComment}
      //       fetchVenueComments={this.props.fetchVenueComments}
      //       createVenueRating={this.props.createVenueRating}
      //       fetchVenueRatings={this.props.fetchVenueRatings}
      //       ratings={this.props.ratings}
      //       key={i}
      //     />
      //   );
      // })}
      // </div>
    );
  }
}

export default VenueIndex;
