package com.cole.vo;

public class Result {
	int result;
	String message;
	Long userId; 
	String email;
	String role;


	public Result() {
	}
		
	public Result(int result, String message) {
		this.result = result;
		this.message = message;
	}

	public Result(int result, String message, Long userId) {
        this.result = result;
        this.message = message;
        this.userId = userId;
    }

	public Result(int result, String message, Long userId, String email) {
        this.result = result;
        this.message = message;
        this.userId = userId;
		this.email = email;
    }

	public Result(int result, String message, Long userId, String email, String role) {
        this.result = result;
        this.message = message;
        this.userId = userId;
		this.email = email;
		this.role = role;
    }
		
	public int getResult() {
		return result;
	}
	public void setResult(int result) {
		this.result = result;
	}
	
	public String getMessage() { 
		return message; 
	}
	
	public void setMessage(String message) { 
		this.message = message; 
	}

	public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}


}