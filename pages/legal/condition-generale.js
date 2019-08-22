
import withLayout from '../../lib/withLayout';

const Index = () => (
	<div className='legal'>
		<h1 className='text-center'>Condition generale</h1>

		<style jsx>{`
				h1 {
					margin: 2rem auto;
					padding-bottom: 1rem;
				}
			`}</style>
	</div >
)

export default withLayout(Index);
