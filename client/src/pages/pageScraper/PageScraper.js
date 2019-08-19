import React from 'react';
import axios from 'axios';
import Input from '../../components/input/input';

import './PageScraper.css';

class PageScraper extends React.Component {
  
  constructor(props){
    super(props);
      //rows:[{url: 'http://tapuz.co.il', data:{"http://tapuz.co.il":{"links":["http://tapuz.co.i/index/","http://tapuz.co.i/blog/category.asp?BlogCatId=1","http://tapuz.co.i/blog/category.asp?BlogCatId=2","http://tapuz.co.i/blog/category.asp?BlogCatId=3","http://tapuz.co.i/blog/category.asp?BlogCatId=4","http://tapuz.co.i/blog/category.asp?BlogCatId=5","http://tapuz.co.i/blog/category.asp?BlogCatId=29","http://tapuz.co.i/blog/category.asp?BlogCatId=36","http://tapuz.co.i/blog/category.asp?BlogCatId=7","http://tapuz.co.i/blog/category.asp?BlogCatId=6","http://tapuz.co.i/blog/category.asp?BlogCatId=18","http://tapuz.co.i/blog/category.asp?BlogCatId=38","http://tapuz.co.i/blog/category.asp?BlogCatId=33","http://tapuz.co.i/blog/category.asp?BlogCatId=35","http://tapuz.co.i/blog/category.asp?BlogCatId=13","http://tapuz.co.i/blog/category.asp?BlogCatId=34","http://tapuz.co.i/blog/category.asp?BlogCatId=11","http://tapuz.co.i/blog/category.asp?BlogCatId=12","http://tapuz.co.i/blog/category.asp?BlogCatId=15","http://tapuz.co.i/blog/category.asp?BlogCatId=17","http://tapuz.co.i/blog/category.asp?BlogCatId=37","http://tapuz.co.i/blog/category.asp?BlogCatId=16","http://tapuz.co.i/blog/category.asp?BlogCatId=19","http://tapuz.co.i/blog/category.asp?BlogCatId=20","http://tapuz.co.i/blog/category.asp?BlogCatId=21","http://tapuz.co.i/blog/category.asp?BlogCatId=22","http://tapuz.co.i/blog/category.asp?BlogCatId=23","http://tapuz.co.i/blog/category.asp?BlogCatId=24","http://tapuz.co.i/blog/category.asp?BlogCatId=26","http://tapuz.co.i/blog/category.asp?BlogCatId=30","http://tapuz.co.i/blog/category.asp?BlogCatId=10","http://tapuz.co.i/blog/category.asp?BlogCatId=27","http://tapuz.co.i/blog/category.asp?BlogCatId=28","http://tapuz.co.i/blog/category.asp?BlogCatId=32","http://tapuz.co.i/blog/category.asp?BlogCatId=8","http://tapuz.co.i/blog/category.asp?BlogCatId=31","http://tapuz.co.i/blog/category.asp?BlogCatId=14"],"title":"\n\tתפוז אנשים\n","url":"http://tapuz.co.il","depth":1},"http://tapuz.co.i/index/":{"links":["http://tapuz.co.i/index/","http://tapuz.co.i/blog/category.asp?BlogCatId=1","http://tapuz.co.i/blog/category.asp?BlogCatId=2","http://tapuz.co.i/blog/category.asp?BlogCatId=3","http://tapuz.co.i/blog/category.asp?BlogCatId=4","http://tapuz.co.i/blog/category.asp?BlogCatId=5","http://tapuz.co.i/blog/category.asp?BlogCatId=29","http://tapuz.co.i/blog/category.asp?BlogCatId=36","http://tapuz.co.i/blog/category.asp?BlogCatId=7","http://tapuz.co.i/blog/category.asp?BlogCatId=6","http://tapuz.co.i/blog/category.asp?BlogCatId=18","http://tapuz.co.i/blog/category.asp?BlogCatId=38","http://tapuz.co.i/blog/category.asp?BlogCatId=33","http://tapuz.co.i/blog/category.asp?BlogCatId=35","http://tapuz.co.i/blog/category.asp?BlogCatId=13","http://tapuz.co.i/blog/category.asp?BlogCatId=34","http://tapuz.co.i/blog/category.asp?BlogCatId=11","http://tapuz.co.i/blog/category.asp?BlogCatId=12","http://tapuz.co.i/blog/category.asp?BlogCatId=15","http://tapuz.co.i/blog/category.asp?BlogCatId=17","http://tapuz.co.i/blog/category.asp?BlogCatId=37","http://tapuz.co.i/blog/category.asp?BlogCatId=16","http://tapuz.co.i/blog/category.asp?BlogCatId=19","http://tapuz.co.i/blog/category.asp?BlogCatId=20","http://tapuz.co.i/blog/category.asp?BlogCatId=21","http://tapuz.co.i/blog/category.asp?BlogCatId=22","http://tapuz.co.i/blog/category.asp?BlogCatId=23","http://tapuz.co.i/blog/category.asp?BlogCatId=24","http://tapuz.co.i/blog/category.asp?BlogCatId=26","http://tapuz.co.i/blog/category.asp?BlogCatId=30","http://tapuz.co.i/blog/category.asp?BlogCatId=10","http://tapuz.co.i/blog/category.asp?BlogCatId=27","http://tapuz.co.i/blog/category.asp?BlogCatId=28","http://tapuz.co.i/blog/category.asp?BlogCatId=32","http://tapuz.co.i/blog/category.asp?BlogCatId=8","http://tapuz.co.i/blog/category.asp?BlogCatId=31","http://tapuz.co.i/blog/category.asp?BlogCatId=14"],"title":"\n\tתפוז אנשים\n","url":"http://tapuz.co.il","depth":2}}}],

    this.state = {
      url:'',
      error: null,
      max_pages: '',
      max_depth: '',
      isLoading: false,
      rows:[],
      selectedRow: null,
    }
  }

  onChange = (value, e) =>{
    this.setState({[e.target.name]: value});
  }

  onSubmit = ()=>{
    this.setState({isLoading:true, error: null});
    let url = this.state.url;
    const urlPattern = /^((http|https):\/\/)/;

  if(!urlPattern.test(url)) {
    url = "http://" + url;
  }
  if(url.slice(-1) !== '/') url += '/';
    axios.post('http://localhost:8000/api/crawl', {
      url: url,
      max_pages: this.state.max_pages,
      max_depth: this.state.max_depth,
    })
    .then((response) =>{
      this.setState({isLoading:false});
      if(!response.data || ( response.data.error || !response.data.nodes)) this.setState({error:response.data && response.data.error? response.data.error: 'empty response'});
      else{
        const rows = [...this.state.rows];
        rows.push({url:this.state.url, data: response.data.nodes});
        this.setState({rows:rows});
      }
    }).catch((e) =>{
      this.setState({isLoading:false, error:e});
      console.log(e);
    });
  }

  onRowClick = index => {
    this.setState({selectedRow:index});
  }
  
  onBackClick = () => {this.setState({selectedRow: null});}

  renderResultsTable = () =>{
    if(this.state.selectedRow !== undefined && this.state.selectedRow !== null) return this.renderSiteResultsTable();
    const rows = [...this.state.rows]
    const tableRow = rows.map((row, i) => {
      let uniqueUrls = [];
      Object.keys(row.data).forEach(k => {if(row.data[k].links && row.data[k].links.length >0)uniqueUrls.push(...row.data[k].links)});
      uniqueUrls = new Set(uniqueUrls);
      return(
          <tr onClick ={() =>this.onRowClick(i)} key={row.url+'_'+uniqueUrls.size} className="resultTableRow mainResultsRow">
              <td>{row.url}</td>
              <td>{uniqueUrls.size}</td>

          </tr>
      );
  });

    return (<div>
              <table className='resultTable'>
                <thead>
                  <tr>
                    <th>Calls Made</th>
                    <th>Unique URL founds</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRow}
                </tbody>
              </table>
            </div>
    );
}

  renderSiteResultsTable = () => {
    const selectedRow = {...this.state.rows[this.state.selectedRow]};
    const tableRow = Object.keys(selectedRow.data).map((page, url) => {
      const linksFormatted = selectedRow.data[page].links && selectedRow.data[page].links.length > 0 ? selectedRow.data[page].links.join(' '): '';
      return(
          <tr className="resultTableRow">
            <td>{selectedRow.data[page].url || url}</td>
            <td>{selectedRow.data[page].depth}</td>
            <td>{selectedRow.data[page].title}</td>
            <td><textarea rows='4' style={{width:'300px'}} defaultValue={linksFormatted}></textarea></td> 
          </tr>
      )});

    return(
      <div>
        <table className='resultTable'>
          <thead>
            <tr>
                <th>URL</th>
                <th>depth</th>
                <th>title</th>
                <th>links</th>
            </tr>
          </thead>
          <tbody>
            {tableRow}
          </tbody>
        </table>
        <button className="linkLike" onClick={this.onBackClick}>Back</button>
      </div>
    );  
  }

  render(){
    return (
      <div className="page pageScrap">
        <div className="header">
          <h1>Scraper</h1> 
          <h2>Scrap url at ease (And maybe some other things..)</h2>
        </div>
        <div className="pageContent">
          <div className="inputForms">
            <Input placeholder='URL' value={this.state.url} onChange={this.onChange} name='url' />
            <Input placeholder='Pages' value={this.state.max_pages} onChange={this.onChange} name='max_pages' type='number' min='1' max='20' step='1'/>
            <Input placeholder='Depth' value={this.state.max_depth} onChange={this.onChange} name='max_depth' type='number' min='1' max='5' step='1'/>
          </div>
          <div style={{marginTop:'30px'}}>
            {this.state.isLoading?
            <img src='/resources/images/loading.gif' alt=''/>
            :<button className="btnDefault" onClick={this.onSubmit}>SUBMIT</button>
            }
          </div>
          <div>
          {this.state.error && <div className="errorText">
            {this.state.error}  
          </div>}
          </div>
          <div>
            {this.state.rows && this.state.rows.length >0 && this.renderResultsTable()}
          </div>
        </div>
      </div>
    );
  }
}

export default PageScraper;
