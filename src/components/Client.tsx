import React from 'react';
import Avatar from 'react-avatar';
interface IClient {
	username: string;
}
const Client = ({ username }: IClient) => {
	return (
		<div className='client'>
			{/* @ts-ignore */}
			<Avatar name={username} size={'50'} round='14px' />
			<span className='userName'>{username}</span>
		</div>
	);
};

export default Client;
