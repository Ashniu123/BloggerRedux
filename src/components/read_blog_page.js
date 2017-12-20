import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './header';
import { startGetBlog } from '../actions/blogs';

class ReadBlogPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: 'Placeholder title',
			body: 'Placeholder body',
			createdAt: 0
		};

	}

	componentDidMount() {
		this.props.blog().then((data) => {
			this.setState(data);
		});
	}

	render() {
		return (
			<div>
				<Header />
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">{this.state.title}</h1>
					</div>
				</div>
				<div className="content-container">
					<p>{this.state.body}</p>
					<div className="date">{moment(this.state.createdAt).format('LLL')}</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	blog: () => dispatch(startGetBlog({ id: props.match.params.id }))
});

export default connect(undefined, mapDispatchToProps)(ReadBlogPage);