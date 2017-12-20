import React, { Component } from 'react';
import moment from 'moment';

export class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.blog ? props.blog.title : '',
			body: props.blog ? props.blog.body : '',
			createdAt: props.blog ? moment(props.blog.createdAt) : moment(),
			error: ''
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		if (this.state.title && this.state.body) {
			this.props.onSubmit({
				title: this.state.title,
				body: this.state.body,
				createdAt: this.state.createdAt.valueOf()
			});
			this.setState({ error: '' });
		} else {
			this.setState({ error: 'Please provide title and body!' });
		}
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleBodyChange(e) {
		this.setState({ body: e.target.value });
	}

	render() {
		return (
			<form className="form" onSubmit={this.handleFormSubmit}>
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<input className="text-input" type="text" placeholder="Post Title" value={this.state.title} onChange={this.handleTitleChange} autoFocus />
				<textarea style={{height: 300}} className="text-input" type="text" placeholder="Post Body" value={this.state.body} onChange={this.handleBodyChange}></textarea>
				<input className="button" type="submit" value="Save Post" />
			</form>
		);
	}
}

export default BlogForm;