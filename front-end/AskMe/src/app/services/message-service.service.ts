import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
		headers: new HttpHeaders({'Access-Control-Allow-Origin':'*',
		'Content-Type': 'application/vnd.sun.wadl+xml'})
	};
const apiUrl = "http://localhost:1337/askme-back-end.herokuapp.com/AskMe/"
//apiUrl ="http://localhost:1337/"
@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

	constructor(public http: HttpClient) { }

	private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    console.error('An error occurred:', error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	    console.error(
	      `Backend returned code ${error.status}, ` +
	      `body was: ${error.error}`);
	  }
	  // return an observable with a user-facing error message
	  return throwError('Something bad happened; please try again later.');
	}

	private extractData(res: Response) {
	  let body = res;
	  return body || { };
	}

	getQuestionsByCategory(category:string, pageNumber:number): Observable<any> {
		const url =  apiUrl +'question/category?category=' + category + '&pagenumber=' + pageNumber;
		return this.http.get(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	getTotQuestCat(category:string): Observable<any> {
		const url = apiUrl + 'question/totalitems?category=' + category;
		return this.http.get(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	getFeaturedQuestion(): Observable<any> {
		const url = apiUrl +'question/featured';
		return this.http.get(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	getQuestion(questionId: string): Observable<any> {
		const url = apiUrl +'question/' + questionId;
		return  this.http.get(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}
	getLogIn(username: string, password: string): Observable<any> {
		const url = apiUrl +'user?username='+username+'&password='+password;
		return this.http.get(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	registerUser(fname: string, lname: string, email: string, 
		username: string, password: string): Observable<any> 
		{
		const url = apiUrl +'user?username='+username+'&password='+password+'&fname='+fname+'&lname='+lname+'&email='+email;
		return this.http.post(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	createQuestion(username, category, questionText, numAnswers, answerText1, answerText2, answerText3, answerText4) {
		const url = apiUrl +'question?username='+ username +'&category='+ category + '&questionText='+ questionText +'&numAnswers='+numAnswers+'&answerText1='+answerText1+'&answerText2='+answerText2+'&answerText3='+answerText3+'&answerText4='+answerText4;
		return this.http.post(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	deleteQuestion(questionId:string) {
		const url = apiUrl +'question?questionId=' + questionId;
		return this.http.delete(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}
	setFeaturedQuestion(questionId: string) {
		const url = apiUrl +'question/featured/' + questionId;
		return this.http.put(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}
	unfeatureQuestion(questionId:string) {
		const url = apiUrl +'question/unfeature/' + questionId;
		return this.http.put(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}
	increaseVoteCount(questionId:string, answerText:string) {
		const url = apiUrl +'answer?questionId=' + questionId + '&answerText=' + answerText;
		return this.http.put(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}
	updateProfile(fname: string, lname: string, email: string, 
		username: string, password: string): Observable<any> 
		{
		const url = apiUrl +'user/userUpdate?username='+username+'&password='+password+'&fname='+fname+'&lname='+lname+'&email='+email;
		return this.http.put(url, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}
	getQuestionsByUsername(username: string): Observable<any> 
	{
	const url = apiUrl + 'question/user/'+username;
	return this.http.get(url, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
	}

	closeQuestion(questionId: string): Observable<any> 
	{
	const url = apiUrl + 'question/closed/'+questionId;
	return this.http.put(url, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
	}
}
