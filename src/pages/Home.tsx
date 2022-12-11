import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');
	const createNewRoom = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const id = uuidV4();
		setRoomId(id);
		toast.success('Created a new room');
	};

	const joinRoom = () => {
		if (!roomId || !username) {
			toast.error('ROOM ID & username is required');
			return;
		}

		// Redirect
		navigate(`/editor/${roomId}`, {
			state: {
				username,
			},
		});
	};

	const handleInputEnter = (e: { code: string }) => {
		if (e.code === 'Enter') {
			joinRoom();
		}
	};
	return (
		<div className='homePageWrapper'>
			<div className='formWrapper'>
				{/* <img
					className='homePageLogo'
					src='/code-sync.png'
					alt='code-sync-logo'
				/> */}
				<h1>Shoot Code</h1>
				<h4 className='mainLabel'>Paste invitation ROOM ID</h4>
				<div className='inputGroup'>
					<input
						type='text'
						className='inputBox'
						placeholder='ROOM ID'
						onChange={(e) => setRoomId(e.target.value)}
						value={roomId}
						onKeyUp={handleInputEnter}
					/>
					<input
						type='text'
						className='inputBox'
						placeholder='USERNAME'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						onKeyUp={handleInputEnter}
					/>
					<button className='btn joinBtn' onClick={joinRoom}>
						Join
					</button>
					<span className='createInfo'>
						If you don't have an invite then create &nbsp;
						<button onClick={createNewRoom} className='createNewBtn'>
							new room
						</button>
					</span>
				</div>
			</div>
			<footer>
				<h4>
					<a href='https://github.com/ghana7989'>Pavan Chindukuri</a>
				</h4>
			</footer>
		</div>
	);
};

export default Home;
