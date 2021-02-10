import React from "react";
import UserIndexItem from "./user_index_item";
import "../../css/user_index.css";
import Searchbar from "../searchbar/searchbar_container";

class UserIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <div className="user-header-container">
          <div className="user-search-container">
            <div className="user-search">
              <Searchbar
                users={this.props.users}
                openModal={this.props.openNavModal}
              />
            </div>
          </div>
          <div className="user-header">
            <h1>Our Artists</h1>
          </div>
        </div>
        {this.props.users.map((user, i) => {
          return <UserIndexItem user={user} 
            createUserRating={this.props.createUserRating}
            fetchUserRatings={this.props.fetchUserRatings}
            ratings={this.props.ratings}
            key={i} />;
        })}
      </div>
    );
  }
}

export default UserIndex;
