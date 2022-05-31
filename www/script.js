class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ text: event.target.value });
    // this.setState({text: event.target.value,summary:'',points:''});
    // points=[]
  }

  handleSubmit(event) {
   
    var abusive_json="{\"text\":\""+ this.state.text +"\"}";
      
    var xhr = new XMLHttpRequest();
    var z = this;
    xhr.open('post', '/api/mpg', true);
    xhr.onload = function () {
      var msg = JSON.parse(this.response)
      // console.log("**" + msg.abusive)
      if(msg.abusive){
        alert("Message contains abusive content");
      }
      else
        alert("Safe message");
      // z.setState({summary:`${msg.summary}`,points:`${points}`})
    };

    xhr.send(abusive_json);
    console.log(z.state)
  
    event.preventDefault();

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <textarea rows="1" cols="100" className="textInput" placeholder="Copy and paste a news article here..." value={this.state.text} onChange={this.handleChange} />  
        <br/>
        <input type="submit" value="Check" className="btn btn-outline-dark" id="submitButton"/>
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);