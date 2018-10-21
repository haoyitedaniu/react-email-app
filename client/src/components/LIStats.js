import React, { Component } from 'react';
import equijoin from '../utils/equijoin';

import { connect } from 'react-redux';
import { fetchLIDownloads, 
          fetchLIConnections,
          fetchLITaggedConnections,
          fetchLITags } from '../actions';

import CampaignList from './linkedin/CampaignList';
import Chart from './linkedin/Chart';
import ConnectionList from './linkedin/ConnectionList';

class LIStats extends Component {

  componentWillMount(){
    this.props.fetchLITags();
    this.props.fetchLIDownloads();
    this.props.fetchLIConnections();
    this.props.fetchLITaggedConnections();
  }

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  render() {
    let {LIDownloads, LIConnections, LITaggedConnections} = this.props;
    let campaignStats = [];

    if(LIConnections.length != 0 && LITaggedConnections.length != 0){ 
      console.log('LIConnections in LIStats: ',LIConnections);
      console.log('LITaggedConnections in LIStats: ',LITaggedConnections);

      const campaignStats = equijoin(LIConnections, LITaggedConnections, "c_public_id", "connection_id",
      ({c_name, is_accepted}, {tags, id}) => ({c_name,is_accepted, tags, id}));

      this.groupBy(campaignStats);

      console.log('campaignStats',campaignStats);
    }

    // <CampaignList campaignStats={campaignStats}/>

    return (
      <div className="App">
        <div className="App-header"> 
            <h2>Your LinkedIn Campaigns</h2>
              
        </div>
      </div>
    );
  }
}

function mapStateToProps({LIDownloads, LIConnections, LITaggedConnections, LITags }) {
  return { LIDownloads, LIConnections, LITaggedConnections, LITags };
}

export default connect(mapStateToProps, 
  { fetchLIDownloads, 
  fetchLITags, 
  fetchLIConnections, 
  fetchLITaggedConnections })(LIStats);
