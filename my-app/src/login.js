import React, {Component} from 'react';
import './login.css'

class Login extends Component{
    constructor(props){
        super(props);
        this.state={id:'', pw:''};
    }

    loginClick = async(e) => {
        e.preventDefault();
        console.log({id:this.state.id, pw:this.state.pw});
        let url = "/api/account/login";
        let options = {
            method : "post",
             headers: {
            'Content-type': 'application/json'
        },
            body : JSON.stringify({id:this.state.id, pw:this.state.pw})
        }        
        let response = await fetch(url, options);

        if(response.ok){
            let result = await response.json();
            if(result.result){
                alert('로그인 성공!');
            }
            else{
                alert('로그인 실패');
            }
        }
        else{
            alert("HTTP error : " + response.status);
        }
    }

    userClick = async(e) =>{
        e.preventDefault();
        let url = '/api/user';
        let response = await fetch(url);

        if(response.ok){
            let user = await response.json();
            console.log(user);
            alert(`hello ${user.name}!`);
        }
        else{
            alert("HTTP error : " + response.status);
        }
    }

    render(){
        return(
            <div className="login_container">
                <form>
                    <label>
                        아이디
                        <input type="text" value={this.state.id}
                        onChange={
                            (e)=>{
                                this.setState({id:e.target.value})
                            }
                        }/>
                    </label>
                    <label>
                        비밀번호
                        <input type="password" value={this.state.pw}
                        onChange={
                            (e) => {
                                this.setState({pw:e.target.value})
                            }
                        }/>
                    </label>
                    <button onClick={this.loginClick}>로그인</button>
                </form>
                <button onClick={this.userClick}>who am i?</button>
            </div>
        );
    }

}

export default Login;