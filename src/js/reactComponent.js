var PackageRender = React.createClass({
  render:function(){
    return (<div className="package" value={this.props.path}>{this.props.packageName}</div>)
  }
})

var packageDom = function(json, filepath){
  ReactDOM.render(
    <PackageRender path={filepath} packageName={json.bookTitle + ":" + json.title}/>,
    document.getElementById('main')
  )
}
