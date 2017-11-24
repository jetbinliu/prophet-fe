'use strict';

import { get } from '../../common/util/service';
import { post } from '../../common/util/service';

export function getMetaStoreDbAndTablesAjax(params) {
	return get('/hive_query/all_metastore_db_tables.json', params);
}

export function descTableAjax(params) {
	return get('/hive_query/desc_table.json', params);
}

export function sendHiveSqlQuery(params) {
	return post('/hive_query/send_query.json', params);
}

export function saveQueryHistory(params) {
	return post('/hive_query/save_query_history.json', params);
}