import React from 'react';
import axios from 'axios';


import './App.css';

class App extends React.Component {

  state = {
    title: '',
    email: '',
    mobile: 0,
    date: new Date(),
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };


  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };


  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      email: this.state.email,
      mobile:this.state.mobile,
      date:this.state.date
    };


    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      email: '',
      mobile: 0,
      date: new Date()
    });
  };

  displayBlogPost = (posts) => {

    if (!posts.length) return null;


    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>Date of Birth : {post.date}</p>
      </div>
    ));
  };

  render() {

    console.log('State: ', this.state);
//started changing .....
    //JSX
    return(
      <div className="app">
        <h2>Welcome to the react form app </h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
              type="text"
              name="title"
              placeholder="Enter your Name"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="text"
              name="email"
              pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
              placeholder="Enter your Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="text"
              size="10"
              pattern="[0-9]{10}"
              name="mobile"
              placeholder="Enter your number"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="date"
              name="date"
              placeholder="Enter your Date Of Birth"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}


export default App;