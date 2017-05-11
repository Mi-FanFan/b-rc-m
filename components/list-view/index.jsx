/**
 * Created by Freeman on 2017/5/11.
 */
import MListView from 'rmc-list-view';
import ListView from './ListView'
import IndexedList from './Indexed';

ListView.DataSource = MListView.DataSource;
ListView.IndexedList = IndexedList;

export default ListView;
