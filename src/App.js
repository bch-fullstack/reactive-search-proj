import React from 'react';
import { ReactiveBase, ReactiveList, ResultCard, DataSearch, SingleRange } from '@appbaseio/reactivesearch';
import './App.css';

const { ResultCardsWrapper } = ReactiveList;

function App() {
	return (
		<ReactiveBase
			app="football_player_lookup"
			credentials="8Gh0pKVof:c437efc3-00e4-409e-ada8-1fd2d94dd559"
		>
			<SingleRange
				componentId="AbilitySensor"
				dataField="Finishing"
				data={[
					{ start: 0, end: 24, label: 'Not skilled' },
					{ start: 25, end: 49, label: 'Moderately skilled' },
					{ start: 50, end: 74, label: 'Skilled' },
					{ start: 75, end: 99, label: 'World Class' },
				]}
				title="Finishing skills"
			/>

			<DataSearch
				componentId="SearchSensor"
				dataField="Name"
				title="Search by Name"
				placeholder="Search for football player by name"
				autosuggest={true}
				highlight={true}
				queryFormat="or"
				fuzziness={0}
				debounce={100}
			/>
			<ReactiveList
				componentId="SearchResult"
				renderItem={res => <div>{res.Name}</div>}
				react={{
					and: ['SearchSensor', 'AbilitySensor'],
				}}
			>
				{({ data, error, loading }) => (
					<ResultCardsWrapper sortBy="desc">
						{
							data.map(item => (
								<ResultCard key={item.ID}>
									<ResultCard.Image src={item.Photo} />
									<ResultCard.Title
										dangerouslySetInnerHTML={{
											__html: item.Name
										}}
									/>
									<ResultCard.Description>
										<div>
											<div>{item.Nationality}</div>
											<div>
												({item.Overall} avg)
                                		</div>
										</div>
										<span>
											{item.Club}
										</span>
										<span>
											Finishing skill: {item.Finishing}
										</span>
									</ResultCard.Description>
								</ResultCard>
							))
						}
					</ResultCardsWrapper>
				)}
			</ReactiveList>

		</ReactiveBase>
	);
}

export default App;
