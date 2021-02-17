import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "../searchbar/searchbar_container";
import ReactStars from "react-rating-stars-component";
import "../../css/user_show.css";

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "", 
      commenter: "", 
      newComment: false, 
      redHeart: false 
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.update = this.update.bind(this); 
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserComments(this.props.match.params.userId);
    this.props.fetchUserRatings(this.props.match.params.userId);
    this.props.fetchUserLikes(this.props.match.params.userId);

    if (this.props.currentUser !== undefined) {
      this.setState({
        commenter: this.props.currentUser,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.newComment === true) {
      this.setState({
        newComment: false,
      });
    }
  }

  update() {
    return (e) =>
      this.setState({
        comment: e.currentTarget.value,
        commenter: this.props.currentUser,
      });
  }

  handleRating(nextValue) {
    this.props.createUserRating(this.props.match.params.userId, nextValue);
  }

  handleLike(e) {
    e.preventDefault();
    this.props.createUserLike(this.props.match.params.userId, this.props.currentUser.id)
    this.setState({
      redHeart: true
    })
  }

  handleUnlike(e) {
    e.preventDefault(); 
    this.props.user.likes.forEach((likeId) => {
      if ((this.props.likes[likeId] !== undefined) && (this.props.likes[likeId].likerId === this.props.currentUser.id)) {
        this.props.removeUserLike(this.props.match.params.userId, likeId)
        // this.props.editUserLike(this.props.user._id, likeId) 
      }
    })
    // this.props.removeUserLike(this.props.match.params.userId, this.props.currentUser.id) //! figure out likeId situation
    this.setState({
      redHeart: false
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createUserComment(
      this.props.match.params.userId,
      this.state.comment,
      this.state.commenter.id
    );

    this.setState({
      comment: "",
      newComment: true,
    });
  }

  render() {
    if (this.props.user === undefined) {
      return null;
    } else {
      const user = this.props.user;

      let showRatingAvg = () => {
        const ratingNums = [];
        this.props.user.ratings.forEach((ratingId, i) => {
          this.props.ratings.forEach((rating) => {
            if (rating._id === ratingId) {
              ratingNums.push(rating.rating);
            }
          });
        });
        if (ratingNums.length <= 0) {
          let avg = 0;
          return (
            <ReactStars
              className="rating-stars"
              value={avg}
              onChange={this.handleRating}
              count={5}
              size={18}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          );
        } else {
          let sum = ratingNums.reduce(
            (acc, currVal, currIdx, arr) => acc + currVal
          );
          let avg = sum / ratingNums.length;
          return (
            <ReactStars
              className="rating-stars"
              value={avg}
              onChange={this.handleRating}
              count={5}
              size={19}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          );
        }
        // if (ratingNums.length === 0) {
        //   return (
        //     <ReactStars
        //       className="rating-stars"
        //       value={0}
        //       onChange={this.handleRating}
        //       count={5}
        //       size={19}
        //       isHalf={true}
        //       emptyIcon={<i className="far fa-star"></i>}
        //       halfIcon={<i className="fa fa-star-half-alt"></i>}
        //       fullIcon={<i className="fa fa-star"></i>}
        //       activeColor="#ffd700"
        //     />
        //   )
        // }
      };

      const userCommentInput =
        this.props.currentUser === undefined ? (
          <div>
            <Link className="login-link" to="/login">
              Log in
            </Link>{" "}
            to leave a review
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <textarea
              type="textarea"
              className="review-input-user"
              cols="45"
              rows="5"
              value={this.state.comment}
              onChange={this.update()}
              placeholder="What did you think of their performance?"
            />
            <br />
            <input className="submit-user" type="submit" value="Submit" />
          </form>
        );

      const noReviews =
        this.props.user.comments.length === 0 ? (
          <div>Be the first to review!</div>
        ) : null;

      // const changeColor = this.state.redHeart ? "red" : "gray"
      // const likeBtn = (this.props.currentUser === undefined) ? null :
      //   (!this.props.user.likes.includes(this.props.currentUser.id)) ?
      //     <div className="likes">
      //       <button className="like-button" onClick={this.handleLike}><i className="fas fa-heart fa-lg" style={{ color: "gray" }}></i></button>
      //       {this.props.user.likes.length}
      //     </div> :
      //     <div className="likes">
      //       <button className="like-button" onClick={this.handleUnlike}><i className="fas fa-heart fa-lg" style={{ color: "red" }}></i></button>
      //       {this.props.user.likes.length}
      //     </div>
      
      const likeButton = () => {
        if (this.props.currentUser === undefined) {
          return null
        }
        let wholeLikes = () => {
          let userLikes = []
          this.props.user.likes.forEach(likeId => {
            if (this.props.likes[likeId] !== undefined) {
              userLikes.push(this.props.likes[likeId])
            }
          })
          return userLikes
        }
        let liked = (wholeLikes().some(like => like.likerId === this.props.currentUser.id))
        if (liked) {
          return (
            <div className="likes">
              <button className="like-button" onClick={this.handleUnlike}><i className="fas fa-heart fa-lg" style={{ color: "red" }}></i></button>
              {this.props.user.likes.length}
            </div>
          )
        } else {
          return (
            <div className="likes">
              <button className="like-button" onClick={this.handleLike}><i className="fas fa-heart fa-lg" style={{ color: "gray" }}></i></button>
              {this.props.user.likes.length}
            </div>
          )
        }
      }  

      return (
        <div className="user-show-page">
          <div className="user-show-header">
            <GiHamburgerMenu
              size={25}
              onClick={() => {
                this.props.openNavModal();
              }}
              className="menu-icon-other"
            />
            <Link className="user-header-h1" to={"/"}>
              <h1 className="header-logo">Busque</h1>
            </Link>
          </div>

          <div className="user-show-info-list">
            <div className="user-show-photo-outer">
              <div className="user-show-photo">
                <img src={user.imageURL} alt="profile" />
              </div>
            </div>
            <div className="user-show-info">
              <div className="user-show-username">{user.username}</div>
              <div className="user-rating">{showRatingAvg()}</div>
              {likeButton()}
              <div className="user-show-performer-type">
                Performer Type: {user.performerType}
              </div>
              <div className="user-show-bio">Bio: {user.bio}</div>
            </div>
          </div>
          <div className="user-reviews">
            <h2>Reviews</h2>
            {userCommentInput}
            <br />
            {noReviews}
          </div>
          {this.props.user.comments.slice().reverse().map((commentId, i) => {
            return (
              <div key={i}>
                  {this.props.comments.map((comment, j) => {
                    if (comment._id === commentId._id) {
                      return (
                        <div className="review-each-user" key={j}>
                          <div className="reviewer-name">
                            {comment.commenter === undefined
                              ? "Username says:"
                              : comment.commenter ===
                                  this.props.currentUser.id &&
                                comment.commenter.username === undefined
                              ? "From You:"
                              : "From " + comment.commenter.username + ":"}
                          </div>
                          {comment.comment}
                          <div className="review-date">{comment.date}</div>
                        </div>
                      );
                    }
                  })}
              </div>
            )
          })}
        </div>
      );
    }
  }
}

export default withRouter(UserShow);
