import vue from 'vue';
import qs from 'qs';
import ajax from 'axios';

const BOOK_EMOTION = 'BOOK_EMOTIOB';
const BOOK_TAG = 'BOOK_TAG'; // 根据标签搜索图书数组
const BOOK_ID = 'BOOK_ID'; // 根据id搜图书具体信息

export default {
    state: {
        emotionBooks: {title: '', items: []},
        books: {title: '', items: []},
        bookInfo: {}
    },
    mutations: {
        [BOOK_EMOTION](state, info) {
            state.emotionBooks.title = info.title;
            state.emotionBooks.items = info.items || [];
        },
        [BOOK_TAG](state, info) {
            state.books.title = info.title;
            state.books.items = info.items || [];
        },
        [BOOK_ID](state, info) {
            state.bookInfo = info || {};
        }
    },
    actions: {
        bookTag({commit}, tag) {  // 根据标签查找book
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/book/search?',
                content: qs.stringify({tag: tag}),
                methods: 'GET',
            })).then(res=> {
                var obj = {
                    title: '最受关注的图书 | ' + tag + '类',
                    items: res.data.books
                };
                console.log(tag);
                if(tag == '情感') {
                    commit(BOOK_EMOTION, obj);  // 情感类book
                } else {
                    commit(BOOK_TAG, obj); 
                }
            }).catch(error=> {
                console.log(error);
            });
        },
        bookId({commit}, id) {

        }
    }
}