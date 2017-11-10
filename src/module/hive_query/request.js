'use strict';

import { get } from '../../common/util/service';

export function getMetaStoreDbAndTables(params) {
	return get('/hive_query/all_metastore_db_tables.json', params);
}
