(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEBUG mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// HELPERS


function _Debugger_unsafeCoerce(value)
{
	return value;
}



// PROGRAMS


var _Debugger_element = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3(elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		elm$browser$Debugger$Main$wrapUpdate(impl.update),
		elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			var currNode = _VirtualDom_virtualize(domNode);
			var currBlocker = elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			var cornerNode = _VirtualDom_doc.createElement('div');
			domNode.parentNode.insertBefore(cornerNode, domNode.nextSibling);
			var cornerCurr = _VirtualDom_virtualize(cornerNode);

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = A2(_VirtualDom_map, elm$browser$Debugger$Main$UserMsg, view(elm$browser$Debugger$Main$getUserModel(model)));
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;

				// update blocker

				var nextBlocker = elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view corner

				if (!model.popout.b)
				{
					var cornerNext = elm$browser$Debugger$Main$cornerView(model);
					var cornerPatches = _VirtualDom_diff(cornerCurr, cornerNext);
					cornerNode = _VirtualDom_applyPatches(cornerNode, cornerCurr, cornerPatches, sendToApp);
					cornerCurr = cornerNext;
					currPopout = undefined;
					return;
				}

				// view popout

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


var _Debugger_document = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3(elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		elm$browser$Debugger$Main$wrapUpdate(impl.update),
		elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var divertHrefToApp = impl.setup && impl.setup(function(x) { return sendToApp(elm$browser$Debugger$Main$UserMsg(x)); });
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			var currBlocker = elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(elm$browser$Debugger$Main$getUserModel(model));
				var nextNode = _VirtualDom_node('body')(_List_Nil)(
					_Utils_ap(
						A2(elm$core$List$map, _VirtualDom_map(elm$browser$Debugger$Main$UserMsg), doc.body),
						_List_Cons(elm$browser$Debugger$Main$cornerView(model), _List_Nil)
					)
				);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);

				// update blocker

				var nextBlocker = elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view popout

				if (!model.popout.b) { currPopout = undefined; return; }

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


function _Debugger_popout()
{
	return {
		b: undefined,
		a: undefined
	};
}

function _Debugger_isOpen(popout)
{
	return !!popout.b;
}

function _Debugger_open(popout)
{
	return _Scheduler_binding(function(callback)
	{
		_Debugger_openWindow(popout);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}

function _Debugger_openWindow(popout)
{
	var w = 900, h = 360, x = screen.width - w, y = screen.height - h;
	var debuggerWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);
	var doc = debuggerWindow.document;
	doc.title = 'Elm Debugger';

	// handle arrow keys
	doc.addEventListener('keydown', function(event) {
		event.metaKey && event.which === 82 && window.location.reload();
		event.which === 38 && (popout.a(elm$browser$Debugger$Main$Up), event.preventDefault());
		event.which === 40 && (popout.a(elm$browser$Debugger$Main$Down), event.preventDefault());
	});

	// handle window close
	window.addEventListener('unload', close);
	debuggerWindow.addEventListener('unload', function() {
		popout.b = undefined;
		popout.a(elm$browser$Debugger$Main$NoOp);
		window.removeEventListener('unload', close);
	});
	function close() {
		popout.b = undefined;
		popout.a(elm$browser$Debugger$Main$NoOp);
		debuggerWindow.close();
	}

	// register new window
	popout.b = doc;
}



// SCROLL


function _Debugger_scroll(popout)
{
	return _Scheduler_binding(function(callback)
	{
		if (popout.b)
		{
			var msgs = popout.b.getElementById('elm-debugger-sidebar');
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}



// UPLOAD


function _Debugger_upload()
{
	return _Scheduler_binding(function(callback)
	{
		var element = document.createElement('input');
		element.setAttribute('type', 'file');
		element.setAttribute('accept', 'text/json');
		element.style.display = 'none';
		element.addEventListener('change', function(event)
		{
			var fileReader = new FileReader();
			fileReader.onload = function(e)
			{
				callback(_Scheduler_succeed(e.target.result));
			};
			fileReader.readAsText(event.target.files[0]);
			document.body.removeChild(element);
		});
		document.body.appendChild(element);
		element.click();
	});
}



// DOWNLOAD


var _Debugger_download = F2(function(historyLength, json)
{
	return _Scheduler_binding(function(callback)
	{
		var fileName = 'history-' + historyLength + '.txt';
		var jsonString = JSON.stringify(json);
		var mime = 'text/plain;charset=utf-8';
		var done = _Scheduler_succeed(_Utils_Tuple0);

		// for IE10+
		if (navigator.msSaveBlob)
		{
			navigator.msSaveBlob(new Blob([jsonString], {type: mime}), fileName);
			return callback(done);
		}

		// for HTML5
		var element = document.createElement('a');
		element.setAttribute('href', 'data:' + mime + ',' + encodeURIComponent(jsonString));
		element.setAttribute('download', fileName);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		callback(done);
	});
});



// POPOUT CONTENT


function _Debugger_messageToString(value)
{
	if (typeof value === 'boolean')
	{
		return value ? 'True' : 'False';
	}

	if (typeof value === 'number')
	{
		return value + '';
	}

	if (typeof value === 'string')
	{
		return '"' + _Debugger_addSlashes(value, false) + '"';
	}

	if (value instanceof String)
	{
		return "'" + _Debugger_addSlashes(value, true) + "'";
	}

	if (typeof value !== 'object' || value === null || !('$' in value))
	{
		return '…';
	}

	if (typeof value.$ === 'number')
	{
		return '…';
	}

	var code = value.$.charCodeAt(0);
	if (code === 0x23 /* # */ || /* a */ 0x61 <= code && code <= 0x7A /* z */)
	{
		return '…';
	}

	if (['Array_elm_builtin', 'Set_elm_builtin', 'RBNode_elm_builtin', 'RBEmpty_elm_builtin'].indexOf(value.$) >= 0)
	{
		return '…';
	}

	var keys = Object.keys(value);
	switch (keys.length)
	{
		case 1:
			return value.$;
		case 2:
			return value.$ + ' ' + _Debugger_messageToString(value.a);
		default:
			return value.$ + ' … ' + _Debugger_messageToString(value[keys[keys.length - 1]]);
	}
}


function _Debugger_init(value)
{
	if (typeof value === 'boolean')
	{
		return A3(elm$browser$Debugger$Expando$Constructor, elm$core$Maybe$Just(value ? 'True' : 'False'), true, _List_Nil);
	}

	if (typeof value === 'number')
	{
		return elm$browser$Debugger$Expando$Primitive(value + '');
	}

	if (typeof value === 'string')
	{
		return elm$browser$Debugger$Expando$S('"' + _Debugger_addSlashes(value, false) + '"');
	}

	if (value instanceof String)
	{
		return elm$browser$Debugger$Expando$S("'" + _Debugger_addSlashes(value, true) + "'");
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (tag === '::' || tag === '[]')
		{
			return A3(elm$browser$Debugger$Expando$Sequence, elm$browser$Debugger$Expando$ListSeq, true,
				A2(elm$core$List$map, _Debugger_init, value)
			);
		}

		if (tag === 'Set_elm_builtin')
		{
			return A3(elm$browser$Debugger$Expando$Sequence, elm$browser$Debugger$Expando$SetSeq, true,
				A3(elm$core$Set$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (tag === 'RBNode_elm_builtin' || tag == 'RBEmpty_elm_builtin')
		{
			return A2(elm$browser$Debugger$Expando$Dictionary, true,
				A3(elm$core$Dict$foldr, _Debugger_initKeyValueCons, _List_Nil, value)
			);
		}

		if (tag === 'Array_elm_builtin')
		{
			return A3(elm$browser$Debugger$Expando$Sequence, elm$browser$Debugger$Expando$ArraySeq, true,
				A3(elm$core$Array$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (typeof tag === 'number')
		{
			return elm$browser$Debugger$Expando$Primitive('<internals>');
		}

		var char = tag.charCodeAt(0);
		if (char === 35 || 65 <= char && char <= 90)
		{
			var list = _List_Nil;
			for (var i in value)
			{
				if (i === '$') continue;
				list = _List_Cons(_Debugger_init(value[i]), list);
			}
			return A3(elm$browser$Debugger$Expando$Constructor, char === 35 ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(tag), true, elm$core$List$reverse(list));
		}

		return elm$browser$Debugger$Expando$Primitive('<internals>');
	}

	if (typeof value === 'object')
	{
		var dict = elm$core$Dict$empty;
		for (var i in value)
		{
			dict = A3(elm$core$Dict$insert, i, _Debugger_init(value[i]), dict);
		}
		return A2(elm$browser$Debugger$Expando$Record, true, dict);
	}

	return elm$browser$Debugger$Expando$Primitive('<internals>');
}

var _Debugger_initCons = F2(function initConsHelp(value, list)
{
	return _List_Cons(_Debugger_init(value), list);
});

var _Debugger_initKeyValueCons = F3(function(key, value, list)
{
	return _List_Cons(
		_Utils_Tuple2(_Debugger_init(key), _Debugger_init(value)),
		list
	);
});

function _Debugger_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}



// BLOCK EVENTS


function _Debugger_updateBlocker(oldBlocker, newBlocker)
{
	if (oldBlocker === newBlocker) return;

	var oldEvents = _Debugger_blockerToEvents(oldBlocker);
	var newEvents = _Debugger_blockerToEvents(newBlocker);

	// remove old blockers
	for (var i = 0; i < oldEvents.length; i++)
	{
		document.removeEventListener(oldEvents[i], _Debugger_blocker, true);
	}

	// add new blockers
	for (var i = 0; i < newEvents.length; i++)
	{
		document.addEventListener(newEvents[i], _Debugger_blocker, true);
	}
}


function _Debugger_blocker(event)
{
	if (event.type === 'keydown' && event.metaKey && event.which === 82)
	{
		return;
	}

	var isScroll = event.type === 'scroll' || event.type === 'wheel';
	for (var node = event.target; node; node = node.parentNode)
	{
		if (isScroll ? node.id === 'elm-debugger-details' : node.id === 'elm-debugger-overlay')
		{
			return;
		}
	}

	event.stopPropagation();
	event.preventDefault();
}

function _Debugger_blockerToEvents(blocker)
{
	return blocker === elm$browser$Debugger$Overlay$BlockNone
		? []
		: blocker === elm$browser$Debugger$Overlay$BlockMost
			? _Debugger_mostEvents
			: _Debugger_allEvents;
}

var _Debugger_mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var _Debugger_allEvents = _Debugger_mostEvents.concat('wheel', 'scroll');





// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail(elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail(elm$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send(elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!elm$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if (elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2(elm$http$Http$BadPayload, result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = elm$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2(elm$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return elm$http$Http$Internal$FormDataBody(formData);
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}var author$project$Form$DatePicker$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Form$Select$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Resettable$Initial = function (a) {
	return {$: 'Initial', a: a};
};
var author$project$Resettable$init = author$project$Resettable$Initial;
var elm$core$Basics$False = {$: 'False'};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var author$project$Form$Select$Internal$init = function (options) {
	return {
		focusedOption: elm$core$Maybe$Nothing,
		isOpen: false,
		options: options,
		searchText: '',
		selectedOption: author$project$Resettable$init(elm$core$Maybe$Nothing)
	};
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$Form$Select$init = A2(elm$core$Basics$composeR, author$project$Form$Select$Internal$init, author$project$Form$Select$Model);
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$utc = A2(elm$time$Time$Zone, 0, _List_Nil);
var mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 'Nonempty', a: a, b: b};
	});
var author$project$Form$DatePicker$Internal$init = function () {
	var seconds = author$project$Form$Select$init(
		A2(
			mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			0,
			A2(elm$core$List$range, 1, 59)));
	var minutes = author$project$Form$Select$init(
		A2(
			mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			0,
			A2(elm$core$List$range, 1, 59)));
	var hours = author$project$Form$Select$init(
		A2(
			mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			0,
			A2(elm$core$List$range, 1, 23)));
	return {
		desiredPosix: elm$core$Maybe$Nothing,
		focusedSelect: elm$core$Maybe$Nothing,
		hours: hours,
		isOpen: false,
		minutes: minutes,
		navigationPosix: elm$core$Maybe$Nothing,
		seconds: seconds,
		selectedPosix: author$project$Resettable$init(elm$core$Maybe$Nothing),
		timeZone: elm$time$Time$utc
	};
}();
var author$project$Form$DatePicker$init = author$project$Form$DatePicker$Model(author$project$Form$DatePicker$Internal$init);
var author$project$Form$DatePicker$Internal$setTimeZone = F2(
	function (timeZone, state) {
		return _Utils_update(
			state,
			{timeZone: timeZone});
	});
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var author$project$Form$DatePicker$setTimeZone = F2(
	function (timeZone, _n0) {
		var state = _n0.a;
		return author$project$Form$DatePicker$Model(
			A2(author$project$Form$DatePicker$Internal$setTimeZone, timeZone, state));
	});
var author$project$Form$FloatInput$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Form$FloatInput$Internal$init = {
	bypassLazy: 0,
	decimal: 0,
	value: author$project$Resettable$init('')
};
var author$project$Form$FloatInput$init = author$project$Form$FloatInput$Model(author$project$Form$FloatInput$Internal$init);
var author$project$Form$Input$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Form$Input$Internal$init = {
	value: author$project$Resettable$init('')
};
var author$project$Form$Input$init = author$project$Form$Input$Model(author$project$Form$Input$Internal$init);
var author$project$Form$IntInput$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Form$IntInput$Internal$init = {
	bypassLazy: 0,
	value: author$project$Resettable$init('')
};
var author$project$Form$IntInput$init = author$project$Form$IntInput$Model(author$project$Form$IntInput$Internal$init);
var author$project$Form$MultiSelect$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Form$MultiSelect$Internal$init = function (options) {
	return {
		focusedOption: elm$core$Maybe$Nothing,
		isOpen: false,
		options: options,
		selectedOptions: author$project$Resettable$init(_List_Nil)
	};
};
var author$project$Form$MultiSelect$init = A2(elm$core$Basics$composeR, author$project$Form$MultiSelect$Internal$init, author$project$Form$MultiSelect$Model);
var author$project$Form$SearchSelect$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Form$SearchSelect$Internal$init = F2(
	function (searchUrl, optionDecoder) {
		return {
			focusedOption: elm$core$Maybe$Nothing,
			input: '',
			isOpen: false,
			isSearching: false,
			optionDecoder: optionDecoder,
			options: _List_Nil,
			searchUrl: searchUrl,
			selectedOption: author$project$Resettable$init(elm$core$Maybe$Nothing)
		};
	});
var author$project$Form$SearchSelect$init = F2(
	function (searchUrl, optionDecoder) {
		return author$project$Form$SearchSelect$Model(
			A2(author$project$Form$SearchSelect$Internal$init, searchUrl, optionDecoder));
	});
var author$project$Form$TextArea$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Form$TextArea$Internal$init = {
	replacements: _List_Nil,
	substituteTabs: false,
	value: author$project$Resettable$init('')
};
var author$project$Form$TextArea$init = author$project$Form$TextArea$Model(author$project$Form$TextArea$Internal$init);
var author$project$Form$TextArea$Internal$setReplacements = F2(
	function (replacements, state) {
		return _Utils_update(
			state,
			{replacements: replacements});
	});
var author$project$Form$TextArea$setReplacements = F2(
	function (replacements, _n0) {
		var state = _n0.a;
		return author$project$Form$TextArea$Model(
			A2(author$project$Form$TextArea$Internal$setReplacements, replacements, state));
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Records$Country$Country = F5(
	function (name, altSpellings, capital, region, population) {
		return {altSpellings: altSpellings, capital: capital, name: name, population: population, region: region};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Records$Country$countryDecoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'population',
	elm$json$Json$Decode$int,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'region',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'capital',
			elm$json$Json$Decode$string,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'altSpellings',
				elm$json$Json$Decode$list(elm$json$Json$Decode$string),
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'name',
					elm$json$Json$Decode$string,
					elm$json$Json$Decode$succeed(author$project$Records$Country$Country))))));
var author$project$Records$MusicGenre$BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop = {$: 'BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop'};
var author$project$Records$MusicGenre$Blues = {$: 'Blues'};
var author$project$Records$MusicGenre$Jazz = {$: 'Jazz'};
var author$project$Records$MusicGenre$Metal = {$: 'Metal'};
var author$project$Records$MusicGenre$Pop = {$: 'Pop'};
var author$project$Records$MusicGenre$Rock = {$: 'Rock'};
var author$project$Records$MusicGenre$asNonempty = A2(
	mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	author$project$Records$MusicGenre$Rock,
	_List_fromArray(
		[author$project$Records$MusicGenre$Metal, author$project$Records$MusicGenre$Blues, author$project$Records$MusicGenre$Jazz, author$project$Records$MusicGenre$Pop, author$project$Records$MusicGenre$BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop]));
var author$project$ToolTip$InternalState = F2(
	function (tip, isOpen) {
		return {isOpen: isOpen, tip: tip};
	});
var author$project$ToolTip$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$ToolTip$init = function (tip) {
	return author$project$ToolTip$Model(
		A2(author$project$ToolTip$InternalState, tip, false));
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var isaacseymour$deprecated_time$Time$TimeZone$find = F2(
	function (time, spans) {
		var ms = elm$time$Time$posixToMillis(time);
		var go = F2(
			function (prev, xs) {
				go:
				while (true) {
					if (xs.$ === 'Default') {
						var span = xs.a;
						return span;
					} else {
						var span = xs.a;
						var other = xs.b;
						if ((_Utils_cmp(prev, ms) < 1) && (_Utils_cmp(ms, span.until) < 0)) {
							return span;
						} else {
							var $temp$prev = span.until,
								$temp$xs = other;
							prev = $temp$prev;
							xs = $temp$xs;
							continue go;
						}
					}
				}
			});
		return A2(go, (-1) / 0, spans);
	});
var isaacseymour$deprecated_time$Time$TimeZone$offset = F2(
	function (time, _n0) {
		var spans = _n0.a.spans;
		return A2(isaacseymour$deprecated_time$Time$TimeZone$find, time, spans).offset;
	});
var elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var isaacseymour$deprecated_time$Time$TimeZone$Default = function (a) {
	return {$: 'Default', a: a};
};
var isaacseymour$deprecated_time$Time$TimeZone$TimeZone = function (a) {
	return {$: 'TimeZone', a: a};
};
var isaacseymour$deprecated_time$Time$TimeZone$errorZone = function (errors) {
	return isaacseymour$deprecated_time$Time$TimeZone$TimeZone(
		{
			name: 'error: ' + errors,
			spans: isaacseymour$deprecated_time$Time$TimeZone$Default(
				{abbreviation: 'error', offset: 0, until: 0})
		});
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Basics$round = _Basics_round;
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$List$map3 = _List_map3;
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var elm$parser$Parser$Advanced$problem = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var elm$parser$Parser$Advanced$succeed = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm_community$list_extra$List$Extra$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				if (accAcc.b) {
					var acc = accAcc.a;
					return A2(
						elm$core$List$cons,
						A2(f, x, acc),
						accAcc);
				} else {
					return _List_Nil;
				}
			});
		return elm$core$List$reverse(
			A3(
				elm$core$List$foldl,
				scan1,
				_List_fromArray(
					[b]),
				xs));
	});
var elm_community$list_extra$List$Extra$scanl1 = F2(
	function (f, xs_) {
		if (!xs_.b) {
			return _List_Nil;
		} else {
			var x = xs_.a;
			var xs = xs_.b;
			return A3(elm_community$list_extra$List$Extra$scanl, f, x, xs);
		}
	});
var isaacseymour$deprecated_time$Time$Internal$minuteMs = 60000;
var isaacseymour$deprecated_time$Time$TimeZone$More = F2(
	function (a, b) {
		return {$: 'More', a: a, b: b};
	});
var isaacseymour$deprecated_time$Time$TimeZone$PackedTimeZone = F5(
	function (name, abbrevs, offsets, indices, diffs) {
		return {abbrevs: abbrevs, diffs: diffs, indices: indices, name: name, offsets: offsets};
	});
var isaacseymour$deprecated_time$Time$TimeZone$Span = F3(
	function (until, abbreviation, offset) {
		return {abbreviation: abbreviation, offset: offset, until: until};
	});
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var isaacseymour$deprecated_time$Time$TimeZone$parseSpace = elm$parser$Parser$chompIf(
	elm$core$Basics$eq(
		_Utils_chr(' ')));
var isaacseymour$deprecated_time$Time$TimeZone$parseAbbrevs = function () {
	var abbrev = elm$parser$Parser$getChompedString(
		elm$parser$Parser$chompWhile(
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr(' '))) && (!_Utils_eq(
					c,
					_Utils_chr('|')));
			}));
	var next = A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			isaacseymour$deprecated_time$Time$TimeZone$parseSpace),
		abbrev);
	var helper = function (revTerms) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$andThen,
					function (s) {
						return helper(
							A2(elm$core$List$cons, s, revTerms));
					},
					next),
					elm$parser$Parser$succeed(
					elm$core$List$reverse(revTerms))
				]));
	};
	return A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(elm$core$Basics$identity),
		A2(
			elm$parser$Parser$andThen,
			function (s) {
				return helper(
					_List_fromArray(
						[s]));
			},
			abbrev));
}();
var elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var elm$core$String$length = _String_length;
var elm$parser$Parser$Advanced$end = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				elm$core$String$length(s.src),
				s.offset) ? A3(elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var isaacseymour$deprecated_time$Time$TimeZone$unsafeBase60Digit = function (c) {
	return elm$core$Char$isDigit(c) || (elm$core$Char$isUpper(c) || elm$core$Char$isLower(c));
};
var isaacseymour$deprecated_time$Time$TimeZone$parseSuccessfulFrac = elm$parser$Parser$getChompedString(
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			elm$parser$Parser$chompIf(
				function (c) {
					return _Utils_eq(
						c,
						_Utils_chr('.'));
				})),
		elm$parser$Parser$chompWhile(
			function (c) {
				return isaacseymour$deprecated_time$Time$TimeZone$unsafeBase60Digit(c);
			})));
var isaacseymour$deprecated_time$Time$TimeZone$parseFrac = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			isaacseymour$deprecated_time$Time$TimeZone$parseSuccessfulFrac,
			elm$parser$Parser$succeed('')
		]));
var isaacseymour$deprecated_time$Time$TimeZone$parseSign = function () {
	var minusOne = function (hyphen) {
		return (hyphen === '-') ? elm$parser$Parser$succeed(-1) : elm$parser$Parser$problem('failed to chomp minus');
	};
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$andThen,
				minusOne,
				elm$parser$Parser$getChompedString(
					elm$parser$Parser$chompIf(
						function (c) {
							return _Utils_eq(
								c,
								_Utils_chr('-'));
						}))),
				elm$parser$Parser$succeed(1)
			]));
}();
var isaacseymour$deprecated_time$Time$TimeZone$parseWhole = elm$parser$Parser$getChompedString(
	elm$parser$Parser$chompWhile(
		function (c) {
			return isaacseymour$deprecated_time$Time$TimeZone$unsafeBase60Digit(c);
		}));
var isaacseymour$deprecated_time$Time$TimeZone$pipe = elm$parser$Parser$chompIf(
	elm$core$Basics$eq(
		_Utils_chr('|')));
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var isaacseymour$deprecated_time$Time$TimeZone$unsafeBase60 = F3(
	function (sign, whole, frac) {
		var toNum = function (c) {
			var n = elm$core$Char$toCode(c);
			return (n > 96) ? (n - 87) : ((n > 64) ? (n - 29) : (n - 48));
		};
		var toWhole = F2(
			function (cs, acc) {
				toWhole:
				while (true) {
					if (!cs.b) {
						return acc;
					} else {
						var c = cs.a;
						var cs_ = cs.b;
						var $temp$cs = cs_,
							$temp$acc = (60 * acc) + toNum(c);
						cs = $temp$cs;
						acc = $temp$acc;
						continue toWhole;
					}
				}
			});
		var toFrac = F3(
			function (cs, mul, acc) {
				toFrac:
				while (true) {
					var mul_ = mul / 60;
					if (!cs.b) {
						return acc;
					} else {
						var c = cs.a;
						var cs_ = cs.b;
						var $temp$cs = cs_,
							$temp$mul = mul_,
							$temp$acc = acc + (mul_ * toNum(c));
						cs = $temp$cs;
						mul = $temp$mul;
						acc = $temp$acc;
						continue toFrac;
					}
				}
			});
		return sign * A3(
			toFrac,
			elm$core$String$toList(frac),
			1,
			A2(
				toWhole,
				elm$core$String$toList(whole),
				0));
	});
var isaacseymour$deprecated_time$Time$TimeZone$parseDiffs = function () {
	var emptyDiffs = A2(
		elm$parser$Parser$andThen,
		function (_n2) {
			return elm$parser$Parser$succeed(_List_Nil);
		},
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			isaacseymour$deprecated_time$Time$TimeZone$pipe));
	var diffsEnd = A2(
		elm$parser$Parser$andThen,
		function (_n1) {
			return elm$parser$Parser$succeed(_List_Nil);
		},
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			elm$parser$Parser$end));
	var convertBase60Times60000 = function (_n0) {
		var sign = _n0.a;
		var whole = _n0.b;
		var frac = _n0.c;
		return ((whole === '') && (frac === '')) ? elm$parser$Parser$problem('expected an alphanumeric character or .') : elm$parser$Parser$succeed(
			60000 * A3(isaacseymour$deprecated_time$Time$TimeZone$unsafeBase60, sign, whole, frac));
	};
	var diff = A2(
		elm$parser$Parser$andThen,
		convertBase60Times60000,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							})),
					isaacseymour$deprecated_time$Time$TimeZone$parseSign),
				isaacseymour$deprecated_time$Time$TimeZone$parseWhole),
			isaacseymour$deprecated_time$Time$TimeZone$parseFrac));
	var next = A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			isaacseymour$deprecated_time$Time$TimeZone$parseSpace),
		diff);
	var helper = function (revTerms) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$andThen,
					function (f) {
						return helper(
							A2(elm$core$List$cons, f, revTerms));
					},
					next),
					elm$parser$Parser$succeed(
					elm$core$List$reverse(revTerms))
				]));
	};
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				emptyDiffs,
				diffsEnd,
				A2(
				elm$parser$Parser$andThen,
				function (f) {
					return helper(
						_List_fromArray(
							[f]));
				},
				diff)
			]));
}();
var elm$core$String$toInt = _String_toInt;
var isaacseymour$deprecated_time$Time$TimeZone$parseIndices = function () {
	var convertDecimal = function (digit) {
		var _n0 = elm$core$String$toInt(digit);
		if (_n0.$ === 'Nothing') {
			return elm$parser$Parser$problem('failed to parse int from ' + digit);
		} else {
			var value = _n0.a;
			return elm$parser$Parser$succeed(value);
		}
	};
	var index = A2(
		elm$parser$Parser$andThen,
		convertDecimal,
		elm$parser$Parser$getChompedString(
			elm$parser$Parser$chompIf(
				function (c) {
					return elm$core$Char$isDigit(c);
				})));
	var next = A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(elm$core$Basics$identity),
		index);
	var helper = function (revTerms) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$andThen,
					function (i) {
						return helper(
							A2(elm$core$List$cons, i, revTerms));
					},
					next),
					elm$parser$Parser$succeed(
					elm$core$List$reverse(revTerms))
				]));
	};
	return A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(elm$core$Basics$identity),
		A2(
			elm$parser$Parser$andThen,
			function (i) {
				return helper(
					_List_fromArray(
						[i]));
			},
			index));
}();
var isaacseymour$deprecated_time$Time$TimeZone$parseName = elm$parser$Parser$getChompedString(
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(elm$core$Basics$identity),
		elm$parser$Parser$chompWhile(
			elm$core$Basics$neq(
				_Utils_chr('|')))));
var isaacseymour$deprecated_time$Time$TimeZone$parseOffsets = function () {
	var convertFrac = function (frac) {
		return elm$parser$Parser$succeed(frac);
	};
	var convertBase60 = function (_n0) {
		var sign = _n0.a;
		var whole = _n0.b;
		var frac = _n0.c;
		return ((whole === '') && (frac === '')) ? elm$parser$Parser$problem('expected an alphanumeric character or .') : elm$parser$Parser$succeed(
			A3(isaacseymour$deprecated_time$Time$TimeZone$unsafeBase60, sign, whole, frac));
	};
	var offset_ = A2(
		elm$parser$Parser$andThen,
		convertBase60,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							})),
					isaacseymour$deprecated_time$Time$TimeZone$parseSign),
				isaacseymour$deprecated_time$Time$TimeZone$parseWhole),
			isaacseymour$deprecated_time$Time$TimeZone$parseFrac));
	var next = A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			isaacseymour$deprecated_time$Time$TimeZone$parseSpace),
		offset_);
	var helper = function (revTerms) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$andThen,
					function (f) {
						return helper(
							A2(elm$core$List$cons, f, revTerms));
					},
					next),
					elm$parser$Parser$succeed(
					elm$core$List$reverse(revTerms))
				]));
	};
	return A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(elm$core$Basics$identity),
		A2(
			elm$parser$Parser$andThen,
			function (f) {
				return helper(
					_List_fromArray(
						[f]));
			},
			offset_));
}();
var isaacseymour$deprecated_time$Time$TimeZone$packedTimeZone = function () {
	var unpack_ = function (data) {
		var untils = A2(elm_community$list_extra$List$Extra$scanl1, elm$core$Basics$add, data.diffs);
		var paddedUntils = _Utils_ap(
			untils,
			_List_fromArray(
				[1 / 0]));
		var offsetsArray = elm$core$Array$fromList(
			A2(
				elm$core$List$map,
				elm$core$Basics$mul(isaacseymour$deprecated_time$Time$Internal$minuteMs),
				A2(elm$core$List$map, elm$core$Basics$round, data.offsets)));
		var offsets = A2(
			elm$core$List$filterMap,
			function (index) {
				return A2(elm$core$Array$get, index, offsetsArray);
			},
			data.indices);
		var abbrArray = elm$core$Array$fromList(data.abbrevs);
		var abbrevs = A2(
			elm$core$List$filterMap,
			function (index) {
				return A2(elm$core$Array$get, index, abbrArray);
			},
			data.indices);
		return (!_Utils_eq(
			elm$core$List$length(abbrevs),
			elm$core$List$length(paddedUntils))) ? elm$parser$Parser$problem(
			'abbrevs was of length ' + (elm$core$String$fromInt(
				elm$core$List$length(abbrevs)) + ('expected ' + elm$core$String$fromInt(
				elm$core$List$length(paddedUntils))))) : ((!_Utils_eq(
			elm$core$List$length(offsets),
			elm$core$List$length(paddedUntils))) ? elm$parser$Parser$problem(
			'offsets was of length ' + (elm$core$String$fromInt(
				elm$core$List$length(offsets)) + ('expected ' + elm$core$String$fromInt(
				elm$core$List$length(paddedUntils))))) : elm$parser$Parser$succeed(
			{
				name: data.name,
				spans: A4(elm$core$List$map3, isaacseymour$deprecated_time$Time$TimeZone$Span, paddedUntils, abbrevs, offsets)
			}));
	};
	var decode = A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						elm$parser$Parser$succeed(isaacseymour$deprecated_time$Time$TimeZone$PackedTimeZone),
						A2(elm$parser$Parser$ignorer, isaacseymour$deprecated_time$Time$TimeZone$parseName, isaacseymour$deprecated_time$Time$TimeZone$pipe)),
					A2(elm$parser$Parser$ignorer, isaacseymour$deprecated_time$Time$TimeZone$parseAbbrevs, isaacseymour$deprecated_time$Time$TimeZone$pipe)),
				A2(elm$parser$Parser$ignorer, isaacseymour$deprecated_time$Time$TimeZone$parseOffsets, isaacseymour$deprecated_time$Time$TimeZone$pipe)),
			A2(elm$parser$Parser$ignorer, isaacseymour$deprecated_time$Time$TimeZone$parseIndices, isaacseymour$deprecated_time$Time$TimeZone$pipe)),
		isaacseymour$deprecated_time$Time$TimeZone$parseDiffs);
	var convert = function (unpacked) {
		var _n0 = elm$core$List$reverse(unpacked.spans);
		if (!_n0.b) {
			return elm$parser$Parser$problem('no spans');
		} else {
			var _default = _n0.a;
			var others = _n0.b;
			return elm$parser$Parser$succeed(
				isaacseymour$deprecated_time$Time$TimeZone$TimeZone(
					{
						name: unpacked.name,
						spans: A3(
							elm$core$List$foldl,
							isaacseymour$deprecated_time$Time$TimeZone$More,
							isaacseymour$deprecated_time$Time$TimeZone$Default(_default),
							others)
					}));
		}
	};
	return A2(
		elm$parser$Parser$andThen,
		convert,
		A2(elm$parser$Parser$andThen, unpack_, decode));
}();
var isaacseymour$deprecated_time$Time$TimeZone$unpack = function (data) {
	return A2(elm$parser$Parser$run, isaacseymour$deprecated_time$Time$TimeZone$packedTimeZone, data);
};
var isaacseymour$deprecated_time$Time$TimeZoneData$unpack = function (data) {
	var _n0 = isaacseymour$deprecated_time$Time$TimeZone$unpack(data);
	if (_n0.$ === 'Err') {
		var errors = _n0.a;
		return isaacseymour$deprecated_time$Time$TimeZone$errorZone(
			'failed to parse zone \'' + (data + ('\': ' + elm$parser$Parser$deadEndsToString(errors))));
	} else {
		var zone = _n0.a;
		return zone;
	}
};
var isaacseymour$deprecated_time$Time$TimeZoneData$australia_brisbane_l = isaacseymour$deprecated_time$Time$TimeZoneData$unpack('Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5');
var isaacseymour$deprecated_time$Time$TimeZones$australia_brisbane = isaacseymour$deprecated_time$Time$TimeZoneData$australia_brisbane_l;
var author$project$Index$Model$initialModel = {
	countryOfBirth: A2(author$project$Form$SearchSelect$init, 'https://restcountries.eu/rest/v2/name/', author$project$Records$Country$countryDecoder),
	datePicker: A2(
		author$project$Form$DatePicker$setTimeZone,
		A2(
			elm$time$Time$customZone,
			elm$core$Basics$abs(
				(((A2(
					isaacseymour$deprecated_time$Time$TimeZone$offset,
					elm$time$Time$millisToPosix(0),
					isaacseymour$deprecated_time$Time$TimeZones$australia_brisbane) / 1000) | 0) / 60) | 0),
			_List_Nil),
		author$project$Form$DatePicker$init),
	datePicker2: author$project$Form$DatePicker$init,
	datePicker3: author$project$Form$DatePicker$init,
	email: author$project$Form$Input$init,
	floatInput: author$project$Form$FloatInput$init,
	input: author$project$Form$Input$init,
	intInput: author$project$Form$IntInput$init,
	isGridButtonGreen: false,
	maybeBlockSelect: author$project$Form$Select$init(author$project$Records$MusicGenre$asNonempty),
	modalLgOpen: false,
	modalResizeOpen: false,
	modalSmOpen: false,
	multiSelect: author$project$Form$MultiSelect$init(author$project$Records$MusicGenre$asNonempty),
	name: author$project$Form$Input$init,
	preferredGenre: author$project$Form$Select$init(author$project$Records$MusicGenre$asNonempty),
	searchSelect: A2(author$project$Form$SearchSelect$init, 'https://restcountries.eu/rest/v2/name/', author$project$Records$Country$countryDecoder),
	select: author$project$Form$Select$init(author$project$Records$MusicGenre$asNonempty),
	startDate: author$project$Form$DatePicker$init,
	textArea: A2(
		author$project$Form$TextArea$setReplacements,
		_List_fromArray(
			[
				_Utils_Tuple2('[]', '☐')
			]),
		author$project$Form$TextArea$init),
	textAreaWrap: author$project$Form$TextArea$init,
	toggle1: false,
	toggle2: false,
	toggle3: false,
	toolTip1: author$project$ToolTip$init('This is the first ToolTip!'),
	toolTip2: author$project$ToolTip$init('This is the second ToolTip!'),
	toolTip3: author$project$ToolTip$init('This is the third ToolTip!'),
	toolTip4: author$project$ToolTip$init('This is the fourth ToolTip!')
};
var author$project$Entities$courseIdToString = function (_n0) {
	var id = _n0.a;
	return id;
};
var author$project$Entities$taskIdToString = function (_n0) {
	var id = _n0.a;
	return id;
};
var author$project$Entities$unitIdToString = function (_n0) {
	var id = _n0.a;
	return id;
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var turboMaCk$any_dict$Dict$Any$AnyDict = function (a) {
	return {$: 'AnyDict', a: a};
};
var turboMaCk$any_dict$Dict$Any$empty = function (toKey) {
	return turboMaCk$any_dict$Dict$Any$AnyDict(
		{dict: elm$core$Dict$empty, toKey: toKey});
};
var author$project$Entities$init = {
	courses: turboMaCk$any_dict$Dict$Any$empty(author$project$Entities$courseIdToString),
	tasks: turboMaCk$any_dict$Dict$Any$empty(author$project$Entities$taskIdToString),
	units: turboMaCk$any_dict$Dict$Any$empty(author$project$Entities$unitIdToString)
};
var author$project$Model$initialDb = {entities: author$project$Entities$init};
var author$project$Page$Index = function (a) {
	return {$: 'Index', a: a};
};
var author$project$Toasters$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Toasters$init = author$project$Toasters$Model(_List_Nil);
var author$project$Model$initialModel = function (navigationKey) {
	return {
		db: author$project$Model$initialDb,
		isAdminMenuOpen: false,
		navigationKey: navigationKey,
		page: author$project$Page$Index(author$project$Index$Model$initialModel),
		toasters: author$project$Toasters$init
	};
};
var author$project$Msg$UrlChange = function (a) {
	return {$: 'UrlChange', a: a};
};
var author$project$Admin$Courses$Page$Search = {$: 'Search'};
var author$project$Admin$Page$Courses = function (a) {
	return {$: 'Courses', a: a};
};
var author$project$Admin$Page$Units = {$: 'Units'};
var author$project$Admin$Page$fromRoute = function (route) {
	if (route.$ === 'Courses') {
		return author$project$Admin$Page$Courses(author$project$Admin$Courses$Page$Search);
	} else {
		return author$project$Admin$Page$Units;
	}
};
var author$project$Form$DatePicker$Internal$DomFocus = function (a) {
	return {$: 'DomFocus', a: a};
};
var author$project$Form$DatePicker$Internal$Hours = {$: 'Hours'};
var author$project$Form$DatePicker$Internal$Minutes = {$: 'Minutes'};
var author$project$Form$DatePicker$Internal$Seconds = {$: 'Seconds'};
var author$project$Form$DatePicker$Internal$UpdateHours = function (a) {
	return {$: 'UpdateHours', a: a};
};
var author$project$Form$DatePicker$Internal$UpdateMinutes = function (a) {
	return {$: 'UpdateMinutes', a: a};
};
var author$project$Form$DatePicker$Internal$UpdateSeconds = function (a) {
	return {$: 'UpdateSeconds', a: a};
};
var author$project$Form$DatePicker$Internal$InitWithCurrentDate = F3(
	function (a, b, c) {
		return {$: 'InitWithCurrentDate', a: a, b: b, c: c};
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var author$project$Form$DatePicker$Internal$openCmd = F4(
	function (date, minPosix, maxPosix, includeTime) {
		if (date.$ === 'Nothing') {
			return A2(
				elm$core$Task$perform,
				A2(author$project$Form$DatePicker$Internal$InitWithCurrentDate, minPosix, maxPosix),
				elm$time$Time$now);
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$json$Json$Decode$map = _Json_map1;
var elm$browser$Debugger$Expando$ArraySeq = {$: 'ArraySeq'};
var elm$browser$Debugger$Expando$Constructor = F3(
	function (a, b, c) {
		return {$: 'Constructor', a: a, b: b, c: c};
	});
var elm$browser$Debugger$Expando$Dictionary = F2(
	function (a, b) {
		return {$: 'Dictionary', a: a, b: b};
	});
var elm$browser$Debugger$Expando$ListSeq = {$: 'ListSeq'};
var elm$browser$Debugger$Expando$Primitive = function (a) {
	return {$: 'Primitive', a: a};
};
var elm$browser$Debugger$Expando$Record = F2(
	function (a, b) {
		return {$: 'Record', a: a, b: b};
	});
var elm$browser$Debugger$Expando$S = function (a) {
	return {$: 'S', a: a};
};
var elm$browser$Debugger$Expando$Sequence = F3(
	function (a, b, c) {
		return {$: 'Sequence', a: a, b: b, c: c};
	});
var elm$browser$Debugger$Expando$SetSeq = {$: 'SetSeq'};
var elm$browser$Debugger$Main$Down = {$: 'Down'};
var elm$browser$Debugger$Main$NoOp = {$: 'NoOp'};
var elm$browser$Debugger$Main$Up = {$: 'Up'};
var elm$browser$Debugger$Main$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var elm$browser$Debugger$History$size = function (history) {
	return history.numMessages;
};
var elm$browser$Debugger$Main$Export = {$: 'Export'};
var elm$browser$Debugger$Main$Import = {$: 'Import'};
var elm$browser$Debugger$Main$Open = {$: 'Open'};
var elm$browser$Debugger$Main$OverlayMsg = function (a) {
	return {$: 'OverlayMsg', a: a};
};
var elm$browser$Debugger$Main$Resume = {$: 'Resume'};
var elm$browser$Debugger$Main$isPaused = function (state) {
	if (state.$ === 'Running') {
		return false;
	} else {
		return true;
	}
};
var elm$browser$Debugger$Overlay$Accept = function (a) {
	return {$: 'Accept', a: a};
};
var elm$browser$Debugger$Overlay$Choose = F2(
	function (a, b) {
		return {$: 'Choose', a: a, b: b};
	});
var elm$browser$Debugger$Overlay$goodNews1 = '\nThe good news is that having values like this in your message type is not\nso great in the long run. You are better off using simpler data, like\n';
var elm$browser$Debugger$Overlay$goodNews2 = '\nfunction can pattern match on that data and call whatever functions, JSON\ndecoders, etc. you need. This makes the code much more explicit and easy to\nfollow for other readers (or you in a few months!)\n';
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$code = _VirtualDom_node('code');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$browser$Debugger$Overlay$viewCode = function (name) {
	return A2(
		elm$html$Html$code,
		_List_Nil,
		_List_fromArray(
			[
				elm$html$Html$text(name)
			]));
};
var elm$browser$Debugger$Overlay$addCommas = function (items) {
	if (!items.b) {
		return '';
	} else {
		if (!items.b.b) {
			var item = items.a;
			return item;
		} else {
			if (!items.b.b.b) {
				var item1 = items.a;
				var _n1 = items.b;
				var item2 = _n1.a;
				return item1 + (' and ' + item2);
			} else {
				var lastItem = items.a;
				var otherItems = items.b;
				return A2(
					elm$core$String$join,
					', ',
					_Utils_ap(
						otherItems,
						_List_fromArray(
							[' and ' + lastItem])));
			}
		}
	}
};
var elm$browser$Debugger$Overlay$problemToString = function (problem) {
	switch (problem.$) {
		case 'Function':
			return 'functions';
		case 'Decoder':
			return 'JSON decoders';
		case 'Task':
			return 'tasks';
		case 'Process':
			return 'processes';
		case 'Socket':
			return 'web sockets';
		case 'Request':
			return 'HTTP requests';
		case 'Program':
			return 'programs';
		default:
			return 'virtual DOM values';
	}
};
var elm$html$Html$li = _VirtualDom_node('li');
var elm$browser$Debugger$Overlay$viewProblemType = function (_n0) {
	var name = _n0.name;
	var problems = _n0.problems;
	return A2(
		elm$html$Html$li,
		_List_Nil,
		_List_fromArray(
			[
				elm$browser$Debugger$Overlay$viewCode(name),
				elm$html$Html$text(
				' can contain ' + (elm$browser$Debugger$Overlay$addCommas(
					A2(elm$core$List$map, elm$browser$Debugger$Overlay$problemToString, problems)) + '.'))
			]));
};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$browser$Debugger$Overlay$viewBadMetadata = function (_n0) {
	var message = _n0.message;
	var problems = _n0.problems;
	return _List_fromArray(
		[
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('The '),
					elm$browser$Debugger$Overlay$viewCode(message),
					elm$html$Html$text(' type of your program cannot be reliably serialized for history files.')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Functions cannot be serialized, nor can values that contain functions. This is a problem in these places:')
				])),
			A2(
			elm$html$Html$ul,
			_List_Nil,
			A2(elm$core$List$map, elm$browser$Debugger$Overlay$viewProblemType, problems)),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(elm$browser$Debugger$Overlay$goodNews1),
					A2(
					elm$html$Html$a,
					_List_fromArray(
						[
							elm$html$Html$Attributes$href('https://guide.elm-lang.org/types/union_types.html')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('union types')
						])),
					elm$html$Html$text(', in your messages. From there, your '),
					elm$browser$Debugger$Overlay$viewCode('update'),
					elm$html$Html$text(elm$browser$Debugger$Overlay$goodNews2)
				]))
		]);
};
var elm$browser$Debugger$Overlay$Cancel = {$: 'Cancel'};
var elm$browser$Debugger$Overlay$Proceed = {$: 'Proceed'};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$browser$Debugger$Overlay$viewButtons = function (buttons) {
	var btn = F2(
		function (msg, string) {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'margin-right', '20px'),
						elm$html$Html$Events$onClick(msg)
					]),
				_List_fromArray(
					[
						elm$html$Html$text(string)
					]));
		});
	var buttonNodes = function () {
		if (buttons.$ === 'Accept') {
			var proceed = buttons.a;
			return _List_fromArray(
				[
					A2(btn, elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		} else {
			var cancel = buttons.a;
			var proceed = buttons.b;
			return _List_fromArray(
				[
					A2(btn, elm$browser$Debugger$Overlay$Cancel, cancel),
					A2(btn, elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'height', '60px'),
				A2(elm$html$Html$Attributes$style, 'line-height', '60px'),
				A2(elm$html$Html$Attributes$style, 'text-align', 'right'),
				A2(elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		buttonNodes);
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$browser$Debugger$Overlay$viewMessage = F4(
	function (config, title, details, buttons) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id('elm-debugger-overlay'),
					A2(elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2(elm$html$Html$Attributes$style, 'top', '0'),
					A2(elm$html$Html$Attributes$style, 'left', '0'),
					A2(elm$html$Html$Attributes$style, 'width', '100%'),
					A2(elm$html$Html$Attributes$style, 'height', '100%'),
					A2(elm$html$Html$Attributes$style, 'color', 'white'),
					A2(elm$html$Html$Attributes$style, 'pointer-events', 'none'),
					A2(elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
					A2(elm$html$Html$Attributes$style, 'z-index', '2147483647')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(elm$html$Html$Attributes$style, 'width', '600px'),
							A2(elm$html$Html$Attributes$style, 'height', '100%'),
							A2(elm$html$Html$Attributes$style, 'padding-left', 'calc(50% - 300px)'),
							A2(elm$html$Html$Attributes$style, 'padding-right', 'calc(50% - 300px)'),
							A2(elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2(elm$html$Html$Attributes$style, 'pointer-events', 'auto')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$style, 'font-size', '36px'),
									A2(elm$html$Html$Attributes$style, 'height', '80px'),
									A2(elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)'),
									A2(elm$html$Html$Attributes$style, 'padding-left', '22px'),
									A2(elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
									A2(elm$html$Html$Attributes$style, 'line-height', '80px')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(title)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('elm-debugger-details'),
									A2(elm$html$Html$Attributes$style, 'padding', ' 8px 20px'),
									A2(elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
									A2(elm$html$Html$Attributes$style, 'max-height', 'calc(100% - 156px)'),
									A2(elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)')
								]),
							details),
							A2(
							elm$html$Html$map,
							config.wrap,
							elm$browser$Debugger$Overlay$viewButtons(buttons))
						]))
				]));
	});
var elm$html$Html$span = _VirtualDom_node('span');
var elm$browser$Debugger$Overlay$button = F2(
	function (msg, label) {
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(msg),
					A2(elm$html$Html$Attributes$style, 'cursor', 'pointer')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var elm$browser$Debugger$Overlay$viewImportExport = F3(
	function (props, importMsg, exportMsg) {
		return A2(
			elm$html$Html$div,
			props,
			_List_fromArray(
				[
					A2(elm$browser$Debugger$Overlay$button, importMsg, 'Import'),
					elm$html$Html$text(' / '),
					A2(elm$browser$Debugger$Overlay$button, exportMsg, 'Export')
				]));
	});
var elm$browser$Debugger$Overlay$viewMiniControls = F2(
	function (config, numMsgs) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2(elm$html$Html$Attributes$style, 'bottom', '0'),
					A2(elm$html$Html$Attributes$style, 'right', '6px'),
					A2(elm$html$Html$Attributes$style, 'border-radius', '4px'),
					A2(elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)'),
					A2(elm$html$Html$Attributes$style, 'color', 'white'),
					A2(elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2(elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
					A2(elm$html$Html$Attributes$style, 'z-index', '2147483647')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'padding', '6px'),
							A2(elm$html$Html$Attributes$style, 'cursor', 'pointer'),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'min-width', '24ch'),
							elm$html$Html$Events$onClick(config.open)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(
							'Explore History (' + (elm$core$String$fromInt(numMsgs) + ')'))
						])),
					A3(
					elm$browser$Debugger$Overlay$viewImportExport,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'padding', '4px 0'),
							A2(elm$html$Html$Attributes$style, 'font-size', '0.8em'),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
						]),
					config.importHistory,
					config.exportHistory)
				]));
	});
var elm$browser$Debugger$Overlay$explanationBad = '\nThe messages in this history do not match the messages handled by your\nprogram. I noticed changes in the following types:\n';
var elm$browser$Debugger$Overlay$explanationRisky = '\nThis history seems old. It will work with this program, but some\nmessages have been added since the history was created:\n';
var elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						elm$core$List$cons,
						sep,
						A2(elm$core$List$cons, x, rest));
				});
			var spersed = A3(elm$core$List$foldr, step, _List_Nil, tl);
			return A2(elm$core$List$cons, hd, spersed);
		}
	});
var elm$browser$Debugger$Overlay$viewMention = F2(
	function (tags, verbed) {
		var _n0 = A2(
			elm$core$List$map,
			elm$browser$Debugger$Overlay$viewCode,
			elm$core$List$reverse(tags));
		if (!_n0.b) {
			return elm$html$Html$text('');
		} else {
			if (!_n0.b.b) {
				var tag = _n0.a;
				return A2(
					elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(verbed),
							tag,
							elm$html$Html$text('.')
						]));
			} else {
				if (!_n0.b.b.b) {
					var tag2 = _n0.a;
					var _n1 = _n0.b;
					var tag1 = _n1.a;
					return A2(
						elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(verbed),
								tag1,
								elm$html$Html$text(' and '),
								tag2,
								elm$html$Html$text('.')
							]));
				} else {
					var lastTag = _n0.a;
					var otherTags = _n0.b;
					return A2(
						elm$html$Html$li,
						_List_Nil,
						A2(
							elm$core$List$cons,
							elm$html$Html$text(verbed),
							_Utils_ap(
								A2(
									elm$core$List$intersperse,
									elm$html$Html$text(', '),
									elm$core$List$reverse(otherTags)),
								_List_fromArray(
									[
										elm$html$Html$text(', and '),
										lastTag,
										elm$html$Html$text('.')
									]))));
				}
			}
		}
	});
var elm$browser$Debugger$Overlay$viewChange = function (change) {
	return A2(
		elm$html$Html$li,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'margin', '8px 0')
			]),
		function () {
			if (change.$ === 'AliasChange') {
				var name = change.a;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								elm$browser$Debugger$Overlay$viewCode(name)
							]))
					]);
			} else {
				var name = change.a;
				var removed = change.b.removed;
				var changed = change.b.changed;
				var added = change.b.added;
				var argsMatch = change.b.argsMatch;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								elm$browser$Debugger$Overlay$viewCode(name)
							])),
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'list-style-type', 'disc'),
								A2(elm$html$Html$Attributes$style, 'padding-left', '2em')
							]),
						_List_fromArray(
							[
								A2(elm$browser$Debugger$Overlay$viewMention, removed, 'Removed '),
								A2(elm$browser$Debugger$Overlay$viewMention, changed, 'Changed '),
								A2(elm$browser$Debugger$Overlay$viewMention, added, 'Added ')
							])),
						argsMatch ? elm$html$Html$text('') : elm$html$Html$text('This may be due to the fact that the type variable names changed.')
					]);
			}
		}());
};
var elm$browser$Debugger$Overlay$viewReport = F2(
	function (isBad, report) {
		switch (report.$) {
			case 'CorruptHistory':
				return _List_fromArray(
					[
						elm$html$Html$text('Looks like this history file is corrupt. I cannot understand it.')
					]);
			case 'VersionChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						elm$html$Html$text('This history was created with Elm ' + (old + (', but you are using Elm ' + (_new + ' right now.'))))
					]);
			case 'MessageChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						elm$html$Html$text('To import some other history, the overall message type must' + ' be the same. The old history has '),
						elm$browser$Debugger$Overlay$viewCode(old),
						elm$html$Html$text(' messages, but the new program works with '),
						elm$browser$Debugger$Overlay$viewCode(_new),
						elm$html$Html$text(' messages.')
					]);
			default:
				var changes = report.a;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(
								isBad ? elm$browser$Debugger$Overlay$explanationBad : elm$browser$Debugger$Overlay$explanationRisky)
							])),
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'list-style-type', 'none'),
								A2(elm$html$Html$Attributes$style, 'padding-left', '20px')
							]),
						A2(elm$core$List$map, elm$browser$Debugger$Overlay$viewChange, changes))
					]);
		}
	});
var elm$browser$Debugger$Overlay$view = F5(
	function (config, isPaused, isOpen, numMsgs, state) {
		switch (state.$) {
			case 'None':
				return isOpen ? elm$html$Html$text('') : (isPaused ? A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', '100%'),
							A2(elm$html$Html$Attributes$style, 'height', '100%'),
							A2(elm$html$Html$Attributes$style, 'cursor', 'pointer'),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
							A2(elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2(elm$html$Html$Attributes$style, 'color', 'white'),
							A2(elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
							A2(elm$html$Html$Attributes$style, 'z-index', '2147483646'),
							elm$html$Html$Events$onClick(config.resume)
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2(elm$html$Html$Attributes$style, 'top', 'calc(50% - 40px)'),
									A2(elm$html$Html$Attributes$style, 'font-size', '80px'),
									A2(elm$html$Html$Attributes$style, 'line-height', '80px'),
									A2(elm$html$Html$Attributes$style, 'height', '80px'),
									A2(elm$html$Html$Attributes$style, 'width', '100%')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Click to Resume')
								])),
							A2(elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs)
						])) : A2(elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs));
			case 'BadMetadata':
				var badMetadata_ = state.a;
				return A4(
					elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot use Import or Export',
					elm$browser$Debugger$Overlay$viewBadMetadata(badMetadata_),
					elm$browser$Debugger$Overlay$Accept('Ok'));
			case 'BadImport':
				var report = state.a;
				return A4(
					elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot Import History',
					A2(elm$browser$Debugger$Overlay$viewReport, true, report),
					elm$browser$Debugger$Overlay$Accept('Ok'));
			default:
				var report = state.a;
				return A4(
					elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Warning',
					A2(elm$browser$Debugger$Overlay$viewReport, false, report),
					A2(elm$browser$Debugger$Overlay$Choose, 'Cancel', 'Import Anyway'));
		}
	});
var elm$browser$Debugger$Main$cornerView = function (model) {
	return A5(
		elm$browser$Debugger$Overlay$view,
		{exportHistory: elm$browser$Debugger$Main$Export, importHistory: elm$browser$Debugger$Main$Import, open: elm$browser$Debugger$Main$Open, resume: elm$browser$Debugger$Main$Resume, wrap: elm$browser$Debugger$Main$OverlayMsg},
		elm$browser$Debugger$Main$isPaused(model.state),
		_Debugger_isOpen(model.popout),
		elm$browser$Debugger$History$size(model.history),
		model.overlay);
};
var elm$browser$Debugger$Main$getCurrentModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.b;
		return model;
	}
};
var elm$browser$Debugger$Main$getUserModel = function (model) {
	return elm$browser$Debugger$Main$getCurrentModel(model.state);
};
var elm$browser$Debugger$Expando$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$browser$Debugger$Expando$Index = F3(
	function (a, b, c) {
		return {$: 'Index', a: a, b: b, c: c};
	});
var elm$browser$Debugger$Expando$Key = {$: 'Key'};
var elm$browser$Debugger$Expando$None = {$: 'None'};
var elm$browser$Debugger$Expando$Toggle = {$: 'Toggle'};
var elm$browser$Debugger$Expando$Value = {$: 'Value'};
var elm$browser$Debugger$Expando$blue = A2(elm$html$Html$Attributes$style, 'color', 'rgb(28, 0, 207)');
var elm$browser$Debugger$Expando$leftPad = function (maybeKey) {
	if (maybeKey.$ === 'Nothing') {
		return _List_Nil;
	} else {
		return _List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'padding-left', '4ch')
			]);
	}
};
var elm$browser$Debugger$Expando$makeArrow = function (arrow) {
	return A2(
		elm$html$Html$span,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'color', '#777'),
				A2(elm$html$Html$Attributes$style, 'padding-left', '2ch'),
				A2(elm$html$Html$Attributes$style, 'width', '2ch'),
				A2(elm$html$Html$Attributes$style, 'display', 'inline-block')
			]),
		_List_fromArray(
			[
				elm$html$Html$text(arrow)
			]));
};
var elm$browser$Debugger$Expando$purple = A2(elm$html$Html$Attributes$style, 'color', 'rgb(136, 19, 145)');
var elm$browser$Debugger$Expando$lineStarter = F3(
	function (maybeKey, maybeIsClosed, description) {
		var arrow = function () {
			if (maybeIsClosed.$ === 'Nothing') {
				return elm$browser$Debugger$Expando$makeArrow('');
			} else {
				if (maybeIsClosed.a) {
					return elm$browser$Debugger$Expando$makeArrow('▸');
				} else {
					return elm$browser$Debugger$Expando$makeArrow('▾');
				}
			}
		}();
		if (maybeKey.$ === 'Nothing') {
			return A2(elm$core$List$cons, arrow, description);
		} else {
			var key = maybeKey.a;
			return A2(
				elm$core$List$cons,
				arrow,
				A2(
					elm$core$List$cons,
					A2(
						elm$html$Html$span,
						_List_fromArray(
							[elm$browser$Debugger$Expando$purple]),
						_List_fromArray(
							[
								elm$html$Html$text(key)
							])),
					A2(
						elm$core$List$cons,
						elm$html$Html$text(' = '),
						description)));
		}
	});
var elm$browser$Debugger$Expando$red = A2(elm$html$Html$Attributes$style, 'color', 'rgb(196, 26, 22)');
var elm$browser$Debugger$Expando$seqTypeToString = F2(
	function (n, seqType) {
		switch (seqType.$) {
			case 'ListSeq':
				return 'List(' + (elm$core$String$fromInt(n) + ')');
			case 'SetSeq':
				return 'Set(' + (elm$core$String$fromInt(n) + ')');
			default:
				return 'Array(' + (elm$core$String$fromInt(n) + ')');
		}
	});
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var elm$browser$Debugger$Expando$elideMiddle = function (str) {
	return (elm$core$String$length(str) <= 18) ? str : (A2(elm$core$String$left, 8, str) + ('...' + A2(elm$core$String$right, 8, str)));
};
var elm$browser$Debugger$Expando$viewExtraTinyRecord = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 1,
				_List_fromArray(
					[
						elm$html$Html$text('}')
					]));
		} else {
			var field = entries.a;
			var rest = entries.b;
			var nextLength = (length + elm$core$String$length(field)) + 1;
			if (nextLength > 18) {
				return _Utils_Tuple2(
					length + 2,
					_List_fromArray(
						[
							elm$html$Html$text('…}')
						]));
			} else {
				var _n1 = A3(elm$browser$Debugger$Expando$viewExtraTinyRecord, nextLength, ',', rest);
				var finalLength = _n1.a;
				var otherHtmls = _n1.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						elm$core$List$cons,
						elm$html$Html$text(starter),
						A2(
							elm$core$List$cons,
							A2(
								elm$html$Html$span,
								_List_fromArray(
									[elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										elm$html$Html$text(field)
									])),
							otherHtmls)));
			}
		}
	});
var elm$browser$Debugger$Expando$viewTinyHelp = function (str) {
	return _Utils_Tuple2(
		elm$core$String$length(str),
		_List_fromArray(
			[
				elm$html$Html$text(str)
			]));
};
var elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$browser$Debugger$Expando$viewExtraTiny = function (value) {
	if (value.$ === 'Record') {
		var record = value.b;
		return A3(
			elm$browser$Debugger$Expando$viewExtraTinyRecord,
			0,
			'{',
			elm$core$Dict$keys(record));
	} else {
		return elm$browser$Debugger$Expando$viewTiny(value);
	}
};
var elm$browser$Debugger$Expando$viewTiny = function (value) {
	switch (value.$) {
		case 'S':
			var stringRep = value.a;
			var str = elm$browser$Debugger$Expando$elideMiddle(stringRep);
			return _Utils_Tuple2(
				elm$core$String$length(str),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[elm$browser$Debugger$Expando$red]),
						_List_fromArray(
							[
								elm$html$Html$text(str)
							]))
					]));
		case 'Primitive':
			var stringRep = value.a;
			return _Utils_Tuple2(
				elm$core$String$length(stringRep),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[elm$browser$Debugger$Expando$blue]),
						_List_fromArray(
							[
								elm$html$Html$text(stringRep)
							]))
					]));
		case 'Sequence':
			var seqType = value.a;
			var valueList = value.c;
			return elm$browser$Debugger$Expando$viewTinyHelp(
				A2(
					elm$browser$Debugger$Expando$seqTypeToString,
					elm$core$List$length(valueList),
					seqType));
		case 'Dictionary':
			var keyValuePairs = value.b;
			return elm$browser$Debugger$Expando$viewTinyHelp(
				'Dict(' + (elm$core$String$fromInt(
					elm$core$List$length(keyValuePairs)) + ')'));
		case 'Record':
			var record = value.b;
			return elm$browser$Debugger$Expando$viewTinyRecord(record);
		default:
			if (!value.c.b) {
				var maybeName = value.a;
				return elm$browser$Debugger$Expando$viewTinyHelp(
					A2(elm$core$Maybe$withDefault, 'Unit', maybeName));
			} else {
				var maybeName = value.a;
				var valueList = value.c;
				return elm$browser$Debugger$Expando$viewTinyHelp(
					function () {
						if (maybeName.$ === 'Nothing') {
							return 'Tuple(' + (elm$core$String$fromInt(
								elm$core$List$length(valueList)) + ')');
						} else {
							var name = maybeName.a;
							return name + ' …';
						}
					}());
			}
	}
};
var elm$browser$Debugger$Expando$viewTinyRecord = function (record) {
	return elm$core$Dict$isEmpty(record) ? _Utils_Tuple2(
		2,
		_List_fromArray(
			[
				elm$html$Html$text('{}')
			])) : A3(
		elm$browser$Debugger$Expando$viewTinyRecordHelp,
		0,
		'{ ',
		elm$core$Dict$toList(record));
};
var elm$browser$Debugger$Expando$viewTinyRecordHelp = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 2,
				_List_fromArray(
					[
						elm$html$Html$text(' }')
					]));
		} else {
			var _n1 = entries.a;
			var field = _n1.a;
			var value = _n1.b;
			var rest = entries.b;
			var fieldLen = elm$core$String$length(field);
			var _n2 = elm$browser$Debugger$Expando$viewExtraTiny(value);
			var valueLen = _n2.a;
			var valueHtmls = _n2.b;
			var newLength = ((length + fieldLen) + valueLen) + 5;
			if (newLength > 60) {
				return _Utils_Tuple2(
					length + 4,
					_List_fromArray(
						[
							elm$html$Html$text(', … }')
						]));
			} else {
				var _n3 = A3(elm$browser$Debugger$Expando$viewTinyRecordHelp, newLength, ', ', rest);
				var finalLength = _n3.a;
				var otherHtmls = _n3.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						elm$core$List$cons,
						elm$html$Html$text(starter),
						A2(
							elm$core$List$cons,
							A2(
								elm$html$Html$span,
								_List_fromArray(
									[elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										elm$html$Html$text(field)
									])),
							A2(
								elm$core$List$cons,
								elm$html$Html$text(' = '),
								A2(
									elm$core$List$cons,
									A2(elm$html$Html$span, _List_Nil, valueHtmls),
									otherHtmls)))));
			}
		}
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$browser$Debugger$Expando$view = F2(
	function (maybeKey, expando) {
		switch (expando.$) {
			case 'S':
				var stringRep = expando.a;
				return A2(
					elm$html$Html$div,
					elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[elm$browser$Debugger$Expando$red]),
								_List_fromArray(
									[
										elm$html$Html$text(stringRep)
									]))
							])));
			case 'Primitive':
				var stringRep = expando.a;
				return A2(
					elm$html$Html$div,
					elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[elm$browser$Debugger$Expando$blue]),
								_List_fromArray(
									[
										elm$html$Html$text(stringRep)
									]))
							])));
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4(elm$browser$Debugger$Expando$viewSequence, maybeKey, seqType, isClosed, valueList);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return A3(elm$browser$Debugger$Expando$viewDictionary, maybeKey, isClosed, keyValuePairs);
			case 'Record':
				var isClosed = expando.a;
				var valueDict = expando.b;
				return A3(elm$browser$Debugger$Expando$viewRecord, maybeKey, isClosed, valueDict);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4(elm$browser$Debugger$Expando$viewConstructor, maybeKey, maybeName, isClosed, valueList);
		}
	});
var elm$browser$Debugger$Expando$viewConstructor = F4(
	function (maybeKey, maybeName, isClosed, valueList) {
		var tinyArgs = A2(
			elm$core$List$map,
			A2(elm$core$Basics$composeL, elm$core$Tuple$second, elm$browser$Debugger$Expando$viewExtraTiny),
			valueList);
		var description = function () {
			var _n7 = _Utils_Tuple2(maybeName, tinyArgs);
			if (_n7.a.$ === 'Nothing') {
				if (!_n7.b.b) {
					var _n8 = _n7.a;
					return _List_fromArray(
						[
							elm$html$Html$text('()')
						]);
				} else {
					var _n9 = _n7.a;
					var _n10 = _n7.b;
					var x = _n10.a;
					var xs = _n10.b;
					return A2(
						elm$core$List$cons,
						elm$html$Html$text('( '),
						A2(
							elm$core$List$cons,
							A2(elm$html$Html$span, _List_Nil, x),
							A3(
								elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											elm$core$List$cons,
											elm$html$Html$text(', '),
											A2(
												elm$core$List$cons,
												A2(elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_fromArray(
									[
										elm$html$Html$text(' )')
									]),
								xs)));
				}
			} else {
				if (!_n7.b.b) {
					var name = _n7.a.a;
					return _List_fromArray(
						[
							elm$html$Html$text(name)
						]);
				} else {
					var name = _n7.a.a;
					var _n11 = _n7.b;
					var x = _n11.a;
					var xs = _n11.b;
					return A2(
						elm$core$List$cons,
						elm$html$Html$text(name + ' '),
						A2(
							elm$core$List$cons,
							A2(elm$html$Html$span, _List_Nil, x),
							A3(
								elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											elm$core$List$cons,
											elm$html$Html$text(' '),
											A2(
												elm$core$List$cons,
												A2(elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_Nil,
								xs)));
				}
			}
		}();
		var _n4 = function () {
			if (!valueList.b) {
				return _Utils_Tuple2(
					elm$core$Maybe$Nothing,
					A2(elm$html$Html$div, _List_Nil, _List_Nil));
			} else {
				if (!valueList.b.b) {
					var entry = valueList.a;
					switch (entry.$) {
						case 'S':
							return _Utils_Tuple2(
								elm$core$Maybe$Nothing,
								A2(elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Primitive':
							return _Utils_Tuple2(
								elm$core$Maybe$Nothing,
								A2(elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Sequence':
							var subValueList = entry.c;
							return _Utils_Tuple2(
								elm$core$Maybe$Just(isClosed),
								isClosed ? A2(elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									elm$html$Html$map,
									A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$None, 0),
									elm$browser$Debugger$Expando$viewSequenceOpen(subValueList)));
						case 'Dictionary':
							var keyValuePairs = entry.b;
							return _Utils_Tuple2(
								elm$core$Maybe$Just(isClosed),
								isClosed ? A2(elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									elm$html$Html$map,
									A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$None, 0),
									elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)));
						case 'Record':
							var record = entry.b;
							return _Utils_Tuple2(
								elm$core$Maybe$Just(isClosed),
								isClosed ? A2(elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									elm$html$Html$map,
									A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$None, 0),
									elm$browser$Debugger$Expando$viewRecordOpen(record)));
						default:
							var subValueList = entry.c;
							return _Utils_Tuple2(
								elm$core$Maybe$Just(isClosed),
								isClosed ? A2(elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									elm$html$Html$map,
									A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$None, 0),
									elm$browser$Debugger$Expando$viewConstructorOpen(subValueList)));
					}
				} else {
					return _Utils_Tuple2(
						elm$core$Maybe$Just(isClosed),
						isClosed ? A2(elm$html$Html$div, _List_Nil, _List_Nil) : elm$browser$Debugger$Expando$viewConstructorOpen(valueList));
				}
			}
		}();
		var maybeIsClosed = _n4.a;
		var openHtml = _n4.b;
		return A2(
			elm$html$Html$div,
			elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(elm$browser$Debugger$Expando$Toggle)
						]),
					A3(elm$browser$Debugger$Expando$lineStarter, maybeKey, maybeIsClosed, description)),
					openHtml
				]));
	});
var elm$browser$Debugger$Expando$viewConstructorEntry = F2(
	function (index, value) {
		return A2(
			elm$html$Html$map,
			A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$None, index),
			A2(
				elm$browser$Debugger$Expando$view,
				elm$core$Maybe$Just(
					elm$core$String$fromInt(index)),
				value));
	});
var elm$browser$Debugger$Expando$viewConstructorOpen = function (valueList) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		A2(elm$core$List$indexedMap, elm$browser$Debugger$Expando$viewConstructorEntry, valueList));
};
var elm$browser$Debugger$Expando$viewDictionary = F3(
	function (maybeKey, isClosed, keyValuePairs) {
		var starter = 'Dict(' + (elm$core$String$fromInt(
			elm$core$List$length(keyValuePairs)) + ')');
		return A2(
			elm$html$Html$div,
			elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								elm$html$Html$text(starter)
							]))),
					isClosed ? elm$html$Html$text('') : elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)
				]));
	});
var elm$browser$Debugger$Expando$viewDictionaryEntry = F2(
	function (index, _n2) {
		var key = _n2.a;
		var value = _n2.b;
		switch (key.$) {
			case 'S':
				var stringRep = key.a;
				return A2(
					elm$html$Html$map,
					A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$Value, index),
					A2(
						elm$browser$Debugger$Expando$view,
						elm$core$Maybe$Just(stringRep),
						value));
			case 'Primitive':
				var stringRep = key.a;
				return A2(
					elm$html$Html$map,
					A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$Value, index),
					A2(
						elm$browser$Debugger$Expando$view,
						elm$core$Maybe$Just(stringRep),
						value));
			default:
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$map,
							A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$Key, index),
							A2(
								elm$browser$Debugger$Expando$view,
								elm$core$Maybe$Just('key'),
								key)),
							A2(
							elm$html$Html$map,
							A2(elm$browser$Debugger$Expando$Index, elm$browser$Debugger$Expando$Value, index),
							A2(
								elm$browser$Debugger$Expando$view,
								elm$core$Maybe$Just('value'),
								value))
						]));
		}
	});
var elm$browser$Debugger$Expando$viewDictionaryOpen = function (keyValuePairs) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		A2(elm$core$List$indexedMap, elm$browser$Debugger$Expando$viewDictionaryEntry, keyValuePairs));
};
var elm$browser$Debugger$Expando$viewRecord = F3(
	function (maybeKey, isClosed, record) {
		var _n1 = isClosed ? _Utils_Tuple3(
			elm$browser$Debugger$Expando$viewTinyRecord(record).b,
			elm$html$Html$text(''),
			elm$html$Html$text('')) : _Utils_Tuple3(
			_List_fromArray(
				[
					elm$html$Html$text('{')
				]),
			elm$browser$Debugger$Expando$viewRecordOpen(record),
			A2(
				elm$html$Html$div,
				elm$browser$Debugger$Expando$leftPad(
					elm$core$Maybe$Just(_Utils_Tuple0)),
				_List_fromArray(
					[
						elm$html$Html$text('}')
					])));
		var start = _n1.a;
		var middle = _n1.b;
		var end = _n1.c;
		return A2(
			elm$html$Html$div,
			elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						elm$core$Maybe$Just(isClosed),
						start)),
					middle,
					end
				]));
	});
var elm$browser$Debugger$Expando$viewRecordEntry = function (_n0) {
	var field = _n0.a;
	var value = _n0.b;
	return A2(
		elm$html$Html$map,
		elm$browser$Debugger$Expando$Field(field),
		A2(
			elm$browser$Debugger$Expando$view,
			elm$core$Maybe$Just(field),
			value));
};
var elm$browser$Debugger$Expando$viewRecordOpen = function (record) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		A2(
			elm$core$List$map,
			elm$browser$Debugger$Expando$viewRecordEntry,
			elm$core$Dict$toList(record)));
};
var elm$browser$Debugger$Expando$viewSequence = F4(
	function (maybeKey, seqType, isClosed, valueList) {
		var starter = A2(
			elm$browser$Debugger$Expando$seqTypeToString,
			elm$core$List$length(valueList),
			seqType);
		return A2(
			elm$html$Html$div,
			elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								elm$html$Html$text(starter)
							]))),
					isClosed ? elm$html$Html$text('') : elm$browser$Debugger$Expando$viewSequenceOpen(valueList)
				]));
	});
var elm$browser$Debugger$Expando$viewSequenceOpen = function (values) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		A2(elm$core$List$indexedMap, elm$browser$Debugger$Expando$viewConstructorEntry, values));
};
var elm$browser$Debugger$Main$ExpandoMsg = function (a) {
	return {$: 'ExpandoMsg', a: a};
};
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var elm$browser$Debugger$History$viewMessage = F3(
	function (currentIndex, index, msg) {
		var messageName = _Debugger_messageToString(msg);
		var className = _Utils_eq(currentIndex, index) ? 'elm-debugger-entry elm-debugger-entry-selected' : 'elm-debugger-entry';
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class(className),
					elm$html$Html$Events$onClick(index)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							elm$html$Html$Attributes$title(messageName),
							elm$html$Html$Attributes$class('elm-debugger-entry-content')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(messageName)
						])),
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('elm-debugger-entry-index')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(
							elm$core$String$fromInt(index))
						]))
				]));
	});
var elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var elm$html$Html$Lazy$lazy3 = elm$virtual_dom$VirtualDom$lazy3;
var elm$browser$Debugger$History$consMsg = F3(
	function (currentIndex, msg, _n0) {
		var index = _n0.a;
		var rest = _n0.b;
		return _Utils_Tuple2(
			index - 1,
			A2(
				elm$core$List$cons,
				A4(elm$html$Html$Lazy$lazy3, elm$browser$Debugger$History$viewMessage, currentIndex, index, msg),
				rest));
	});
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$browser$Debugger$History$styles = A3(
	elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			elm$html$Html$text('\n\n.elm-debugger-entry {\n  cursor: pointer;\n  width: 100%;\n}\n\n.elm-debugger-entry:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n.elm-debugger-entry-selected, .elm-debugger-entry-selected:hover {\n  background-color: rgb(10, 10, 10);\n}\n\n.elm-debugger-entry-content {\n  width: calc(100% - 7ch);\n  padding-top: 4px;\n  padding-bottom: 4px;\n  padding-left: 1ch;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.elm-debugger-entry-index {\n  color: #666;\n  width: 5ch;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  padding-right: 1ch;\n  text-align: right;\n  display: block;\n  float: right;\n}\n\n')
		]));
var elm$browser$Debugger$History$maxSnapshotSize = 64;
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Array$foldl = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldl,
			func,
			A3(elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var elm$browser$Debugger$History$viewSnapshot = F3(
	function (currentIndex, index, _n0) {
		var messages = _n0.messages;
		return A2(
			elm$html$Html$div,
			_List_Nil,
			A3(
				elm$core$Array$foldl,
				elm$browser$Debugger$History$consMsg(currentIndex),
				_Utils_Tuple2(index - 1, _List_Nil),
				messages).b);
	});
var elm$browser$Debugger$History$consSnapshot = F3(
	function (currentIndex, snapshot, _n0) {
		var index = _n0.a;
		var rest = _n0.b;
		var nextIndex = index - elm$browser$Debugger$History$maxSnapshotSize;
		var currentIndexHelp = ((_Utils_cmp(nextIndex, currentIndex) < 1) && (_Utils_cmp(currentIndex, index) < 0)) ? currentIndex : (-1);
		return _Utils_Tuple2(
			index - elm$browser$Debugger$History$maxSnapshotSize,
			A2(
				elm$core$List$cons,
				A4(elm$html$Html$Lazy$lazy3, elm$browser$Debugger$History$viewSnapshot, currentIndexHelp, index, snapshot),
				rest));
	});
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var elm$browser$Debugger$History$viewSnapshots = F2(
	function (currentIndex, snapshots) {
		var highIndex = elm$browser$Debugger$History$maxSnapshotSize * elm$core$Array$length(snapshots);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			A3(
				elm$core$Array$foldr,
				elm$browser$Debugger$History$consSnapshot(currentIndex),
				_Utils_Tuple2(highIndex, _List_Nil),
				snapshots).b);
	});
var elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var elm$html$Html$Lazy$lazy2 = elm$virtual_dom$VirtualDom$lazy2;
var elm$browser$Debugger$History$view = F2(
	function (maybeIndex, _n0) {
		var snapshots = _n0.snapshots;
		var recent = _n0.recent;
		var numMessages = _n0.numMessages;
		var _n1 = function () {
			if (maybeIndex.$ === 'Nothing') {
				return _Utils_Tuple2(-1, 'calc(100% - 24px)');
			} else {
				var i = maybeIndex.a;
				return _Utils_Tuple2(i, 'calc(100% - 54px)');
			}
		}();
		var index = _n1.a;
		var height = _n1.b;
		var newStuff = A3(
			elm$core$List$foldl,
			elm$browser$Debugger$History$consMsg(index),
			_Utils_Tuple2(numMessages - 1, _List_Nil),
			recent.messages).b;
		var oldStuff = A3(elm$html$Html$Lazy$lazy2, elm$browser$Debugger$History$viewSnapshots, index, snapshots);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id('elm-debugger-sidebar'),
					A2(elm$html$Html$Attributes$style, 'width', '100%'),
					A2(elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
					A2(elm$html$Html$Attributes$style, 'height', height)
				]),
			A2(
				elm$core$List$cons,
				elm$browser$Debugger$History$styles,
				A2(elm$core$List$cons, oldStuff, newStuff)));
	});
var elm$browser$Debugger$Main$Jump = function (a) {
	return {$: 'Jump', a: a};
};
var elm$browser$Debugger$Main$resumeStyle = '\n\n.elm-debugger-resume {\n  width: 100%;\n  height: 30px;\n  line-height: 30px;\n  cursor: pointer;\n}\n\n.elm-debugger-resume:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n';
var elm$browser$Debugger$Main$viewResumeButton = function (maybeIndex) {
	if (maybeIndex.$ === 'Nothing') {
		return elm$html$Html$text('');
	} else {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(elm$browser$Debugger$Main$Resume),
					elm$html$Html$Attributes$class('elm-debugger-resume')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Resume'),
					A3(
					elm$html$Html$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(elm$browser$Debugger$Main$resumeStyle)
						]))
				]));
	}
};
var elm$browser$Debugger$Main$viewTextButton = F2(
	function (msg, label) {
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(msg),
					A2(elm$html$Html$Attributes$style, 'cursor', 'pointer')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var elm$browser$Debugger$Main$playButton = function (maybeIndex) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'width', '100%'),
				A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2(elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		_List_fromArray(
			[
				elm$browser$Debugger$Main$viewResumeButton(maybeIndex),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'width', '100%'),
						A2(elm$html$Html$Attributes$style, 'height', '24px'),
						A2(elm$html$Html$Attributes$style, 'line-height', '24px'),
						A2(elm$html$Html$Attributes$style, 'font-size', '12px')
					]),
				_List_fromArray(
					[
						A2(elm$browser$Debugger$Main$viewTextButton, elm$browser$Debugger$Main$Import, 'Import'),
						elm$html$Html$text(' / '),
						A2(elm$browser$Debugger$Main$viewTextButton, elm$browser$Debugger$Main$Export, 'Export')
					]))
			]));
};
var elm$browser$Debugger$Main$viewSidebar = F2(
	function (state, history) {
		var maybeIndex = function () {
			if (state.$ === 'Running') {
				return elm$core$Maybe$Nothing;
			} else {
				var index = state.a;
				return elm$core$Maybe$Just(index);
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'display', 'block'),
					A2(elm$html$Html$Attributes$style, 'float', 'left'),
					A2(elm$html$Html$Attributes$style, 'width', '30ch'),
					A2(elm$html$Html$Attributes$style, 'height', '100%'),
					A2(elm$html$Html$Attributes$style, 'color', 'white'),
					A2(elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$map,
					elm$browser$Debugger$Main$Jump,
					A2(elm$browser$Debugger$History$view, maybeIndex, history)),
					elm$browser$Debugger$Main$playButton(maybeIndex)
				]));
	});
var elm$browser$Debugger$Main$popoutView = function (_n0) {
	var history = _n0.history;
	var state = _n0.state;
	var expando = _n0.expando;
	return A3(
		elm$html$Html$node,
		'body',
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'margin', '0'),
				A2(elm$html$Html$Attributes$style, 'padding', '0'),
				A2(elm$html$Html$Attributes$style, 'width', '100%'),
				A2(elm$html$Html$Attributes$style, 'height', '100%'),
				A2(elm$html$Html$Attributes$style, 'font-family', 'monospace'),
				A2(elm$html$Html$Attributes$style, 'overflow', 'auto')
			]),
		_List_fromArray(
			[
				A2(elm$browser$Debugger$Main$viewSidebar, state, history),
				A2(
				elm$html$Html$map,
				elm$browser$Debugger$Main$ExpandoMsg,
				A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'display', 'block'),
							A2(elm$html$Html$Attributes$style, 'float', 'left'),
							A2(elm$html$Html$Attributes$style, 'height', '100%'),
							A2(elm$html$Html$Attributes$style, 'width', 'calc(100% - 30ch)'),
							A2(elm$html$Html$Attributes$style, 'margin', '0'),
							A2(elm$html$Html$Attributes$style, 'overflow', 'auto'),
							A2(elm$html$Html$Attributes$style, 'cursor', 'default')
						]),
					_List_fromArray(
						[
							A2(elm$browser$Debugger$Expando$view, elm$core$Maybe$Nothing, expando)
						])))
			]));
};
var elm$browser$Debugger$Overlay$BlockAll = {$: 'BlockAll'};
var elm$browser$Debugger$Overlay$BlockMost = {$: 'BlockMost'};
var elm$browser$Debugger$Overlay$BlockNone = {$: 'BlockNone'};
var elm$browser$Debugger$Overlay$toBlockerType = F2(
	function (isPaused, state) {
		switch (state.$) {
			case 'None':
				return isPaused ? elm$browser$Debugger$Overlay$BlockAll : elm$browser$Debugger$Overlay$BlockNone;
			case 'BadMetadata':
				return elm$browser$Debugger$Overlay$BlockMost;
			case 'BadImport':
				return elm$browser$Debugger$Overlay$BlockMost;
			default:
				return elm$browser$Debugger$Overlay$BlockMost;
		}
	});
var elm$browser$Debugger$Main$toBlockerType = function (model) {
	return A2(
		elm$browser$Debugger$Overlay$toBlockerType,
		elm$browser$Debugger$Main$isPaused(model.state),
		model.overlay);
};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2(elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var elm$core$Dict$size = function (dict) {
	return A2(elm$core$Dict$sizeHelp, 0, dict);
};
var elm$browser$Debugger$Expando$initHelp = F2(
	function (isOuter, expando) {
		switch (expando.$) {
			case 'S':
				return expando;
			case 'Primitive':
				return expando;
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var items = expando.c;
				return isOuter ? A3(
					elm$browser$Debugger$Expando$Sequence,
					seqType,
					false,
					A2(
						elm$core$List$map,
						elm$browser$Debugger$Expando$initHelp(false),
						items)) : ((elm$core$List$length(items) <= 8) ? A3(elm$browser$Debugger$Expando$Sequence, seqType, false, items) : expando);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return isOuter ? A2(
					elm$browser$Debugger$Expando$Dictionary,
					false,
					A2(
						elm$core$List$map,
						function (_n1) {
							var k = _n1.a;
							var v = _n1.b;
							return _Utils_Tuple2(
								k,
								A2(elm$browser$Debugger$Expando$initHelp, false, v));
						},
						keyValuePairs)) : ((elm$core$List$length(keyValuePairs) <= 8) ? A2(elm$browser$Debugger$Expando$Dictionary, false, keyValuePairs) : expando);
			case 'Record':
				var isClosed = expando.a;
				var entries = expando.b;
				return isOuter ? A2(
					elm$browser$Debugger$Expando$Record,
					false,
					A2(
						elm$core$Dict$map,
						F2(
							function (_n2, v) {
								return A2(elm$browser$Debugger$Expando$initHelp, false, v);
							}),
						entries)) : ((elm$core$Dict$size(entries) <= 4) ? A2(elm$browser$Debugger$Expando$Record, false, entries) : expando);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var args = expando.c;
				return isOuter ? A3(
					elm$browser$Debugger$Expando$Constructor,
					maybeName,
					false,
					A2(
						elm$core$List$map,
						elm$browser$Debugger$Expando$initHelp(false),
						args)) : ((elm$core$List$length(args) <= 4) ? A3(elm$browser$Debugger$Expando$Constructor, maybeName, false, args) : expando);
		}
	});
var elm$browser$Debugger$Expando$init = function (value) {
	return A2(
		elm$browser$Debugger$Expando$initHelp,
		true,
		_Debugger_init(value));
};
var elm$browser$Debugger$History$History = F3(
	function (snapshots, recent, numMessages) {
		return {numMessages: numMessages, recent: recent, snapshots: snapshots};
	});
var elm$browser$Debugger$History$RecentHistory = F3(
	function (model, messages, numMessages) {
		return {messages: messages, model: model, numMessages: numMessages};
	});
var elm$browser$Debugger$History$empty = function (model) {
	return A3(
		elm$browser$Debugger$History$History,
		elm$core$Array$empty,
		A3(elm$browser$Debugger$History$RecentHistory, model, _List_Nil, 0),
		0);
};
var elm$browser$Debugger$Main$Running = function (a) {
	return {$: 'Running', a: a};
};
var elm$browser$Debugger$Metadata$Error = F2(
	function (message, problems) {
		return {message: message, problems: problems};
	});
var elm$browser$Debugger$Metadata$Metadata = F2(
	function (versions, types) {
		return {types: types, versions: versions};
	});
var elm$browser$Debugger$Metadata$Types = F3(
	function (message, aliases, unions) {
		return {aliases: aliases, message: message, unions: unions};
	});
var elm$browser$Debugger$Metadata$Alias = F2(
	function (args, tipe) {
		return {args: args, tipe: tipe};
	});
var elm$browser$Debugger$Metadata$decodeAlias = A3(
	elm$json$Json$Decode$map2,
	elm$browser$Debugger$Metadata$Alias,
	A2(
		elm$json$Json$Decode$field,
		'args',
		elm$json$Json$Decode$list(elm$json$Json$Decode$string)),
	A2(elm$json$Json$Decode$field, 'type', elm$json$Json$Decode$string));
var elm$browser$Debugger$Metadata$Union = F2(
	function (args, tags) {
		return {args: args, tags: tags};
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		elm$json$Json$Decode$map,
		elm$core$Dict$fromList,
		elm$json$Json$Decode$keyValuePairs(decoder));
};
var elm$browser$Debugger$Metadata$decodeUnion = A3(
	elm$json$Json$Decode$map2,
	elm$browser$Debugger$Metadata$Union,
	A2(
		elm$json$Json$Decode$field,
		'args',
		elm$json$Json$Decode$list(elm$json$Json$Decode$string)),
	A2(
		elm$json$Json$Decode$field,
		'tags',
		elm$json$Json$Decode$dict(
			elm$json$Json$Decode$list(elm$json$Json$Decode$string))));
var elm$json$Json$Decode$map3 = _Json_map3;
var elm$browser$Debugger$Metadata$decodeTypes = A4(
	elm$json$Json$Decode$map3,
	elm$browser$Debugger$Metadata$Types,
	A2(elm$json$Json$Decode$field, 'message', elm$json$Json$Decode$string),
	A2(
		elm$json$Json$Decode$field,
		'aliases',
		elm$json$Json$Decode$dict(elm$browser$Debugger$Metadata$decodeAlias)),
	A2(
		elm$json$Json$Decode$field,
		'unions',
		elm$json$Json$Decode$dict(elm$browser$Debugger$Metadata$decodeUnion)));
var elm$browser$Debugger$Metadata$Versions = function (elm) {
	return {elm: elm};
};
var elm$browser$Debugger$Metadata$decodeVersions = A2(
	elm$json$Json$Decode$map,
	elm$browser$Debugger$Metadata$Versions,
	A2(elm$json$Json$Decode$field, 'elm', elm$json$Json$Decode$string));
var elm$browser$Debugger$Metadata$decoder = A3(
	elm$json$Json$Decode$map2,
	elm$browser$Debugger$Metadata$Metadata,
	A2(elm$json$Json$Decode$field, 'versions', elm$browser$Debugger$Metadata$decodeVersions),
	A2(elm$json$Json$Decode$field, 'types', elm$browser$Debugger$Metadata$decodeTypes));
var elm$browser$Debugger$Metadata$ProblemType = F2(
	function (name, problems) {
		return {name: name, problems: problems};
	});
var elm$core$String$contains = _String_contains;
var elm$browser$Debugger$Metadata$hasProblem = F2(
	function (tipe, _n0) {
		var problem = _n0.a;
		var token = _n0.b;
		return A2(elm$core$String$contains, token, tipe) ? elm$core$Maybe$Just(problem) : elm$core$Maybe$Nothing;
	});
var elm$browser$Debugger$Metadata$Decoder = {$: 'Decoder'};
var elm$browser$Debugger$Metadata$Function = {$: 'Function'};
var elm$browser$Debugger$Metadata$Process = {$: 'Process'};
var elm$browser$Debugger$Metadata$Program = {$: 'Program'};
var elm$browser$Debugger$Metadata$Request = {$: 'Request'};
var elm$browser$Debugger$Metadata$Socket = {$: 'Socket'};
var elm$browser$Debugger$Metadata$Task = {$: 'Task'};
var elm$browser$Debugger$Metadata$VirtualDom = {$: 'VirtualDom'};
var elm$browser$Debugger$Metadata$problemTable = _List_fromArray(
	[
		_Utils_Tuple2(elm$browser$Debugger$Metadata$Function, '->'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$Decoder, 'Json.Decode.Decoder'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$Task, 'Task.Task'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$Process, 'Process.Id'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$Socket, 'WebSocket.LowLevel.WebSocket'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$Request, 'Http.Request'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$Program, 'Platform.Program'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Node'),
		_Utils_Tuple2(elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Attribute')
	]);
var elm$browser$Debugger$Metadata$findProblems = function (tipe) {
	return A2(
		elm$core$List$filterMap,
		elm$browser$Debugger$Metadata$hasProblem(tipe),
		elm$browser$Debugger$Metadata$problemTable);
};
var elm$browser$Debugger$Metadata$collectBadAliases = F3(
	function (name, _n0, list) {
		var tipe = _n0.tipe;
		var _n1 = elm$browser$Debugger$Metadata$findProblems(tipe);
		if (!_n1.b) {
			return list;
		} else {
			var problems = _n1;
			return A2(
				elm$core$List$cons,
				A2(elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$browser$Debugger$Metadata$collectBadUnions = F3(
	function (name, _n0, list) {
		var tags = _n0.tags;
		var _n1 = A2(
			elm$core$List$concatMap,
			elm$browser$Debugger$Metadata$findProblems,
			elm$core$List$concat(
				elm$core$Dict$values(tags)));
		if (!_n1.b) {
			return list;
		} else {
			var problems = _n1;
			return A2(
				elm$core$List$cons,
				A2(elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$browser$Debugger$Metadata$isPortable = function (_n0) {
	var types = _n0.types;
	var badAliases = A3(elm$core$Dict$foldl, elm$browser$Debugger$Metadata$collectBadAliases, _List_Nil, types.aliases);
	var _n1 = A3(elm$core$Dict$foldl, elm$browser$Debugger$Metadata$collectBadUnions, badAliases, types.unions);
	if (!_n1.b) {
		return elm$core$Maybe$Nothing;
	} else {
		var problems = _n1;
		return elm$core$Maybe$Just(
			A2(elm$browser$Debugger$Metadata$Error, types.message, problems));
	}
};
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$browser$Debugger$Metadata$decode = function (value) {
	var _n0 = A2(elm$json$Json$Decode$decodeValue, elm$browser$Debugger$Metadata$decoder, value);
	if (_n0.$ === 'Err') {
		return elm$core$Result$Err(
			A2(elm$browser$Debugger$Metadata$Error, 'The compiler is generating bad metadata. This is a compiler bug!', _List_Nil));
	} else {
		var metadata = _n0.a;
		var _n1 = elm$browser$Debugger$Metadata$isPortable(metadata);
		if (_n1.$ === 'Nothing') {
			return elm$core$Result$Ok(metadata);
		} else {
			var error = _n1.a;
			return elm$core$Result$Err(error);
		}
	}
};
var elm$browser$Debugger$Overlay$None = {$: 'None'};
var elm$browser$Debugger$Overlay$none = elm$browser$Debugger$Overlay$None;
var elm$core$Platform$Cmd$map = _Platform_map;
var elm$browser$Debugger$Main$wrapInit = F4(
	function (metadata, popout, init, flags) {
		var _n0 = init(flags);
		var userModel = _n0.a;
		var userCommands = _n0.b;
		return _Utils_Tuple2(
			{
				expando: elm$browser$Debugger$Expando$init(userModel),
				history: elm$browser$Debugger$History$empty(userModel),
				metadata: elm$browser$Debugger$Metadata$decode(metadata),
				overlay: elm$browser$Debugger$Overlay$none,
				popout: popout,
				state: elm$browser$Debugger$Main$Running(userModel)
			},
			A2(elm$core$Platform$Cmd$map, elm$browser$Debugger$Main$UserMsg, userCommands));
	});
var elm$browser$Debugger$Main$getLatestModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.c;
		return model;
	}
};
var elm$core$Platform$Sub$map = _Platform_map;
var elm$browser$Debugger$Main$wrapSubs = F2(
	function (subscriptions, model) {
		return A2(
			elm$core$Platform$Sub$map,
			elm$browser$Debugger$Main$UserMsg,
			subscriptions(
				elm$browser$Debugger$Main$getLatestModel(model.state)));
	});
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$browser$Debugger$Expando$mergeDictHelp = F3(
	function (oldDict, key, value) {
		var _n12 = A2(elm$core$Dict$get, key, oldDict);
		if (_n12.$ === 'Nothing') {
			return value;
		} else {
			var oldValue = _n12.a;
			return A2(elm$browser$Debugger$Expando$mergeHelp, oldValue, value);
		}
	});
var elm$browser$Debugger$Expando$mergeHelp = F2(
	function (old, _new) {
		var _n3 = _Utils_Tuple2(old, _new);
		_n3$6:
		while (true) {
			switch (_n3.b.$) {
				case 'S':
					return _new;
				case 'Primitive':
					return _new;
				case 'Sequence':
					if (_n3.a.$ === 'Sequence') {
						var _n4 = _n3.a;
						var isClosed = _n4.b;
						var oldValues = _n4.c;
						var _n5 = _n3.b;
						var seqType = _n5.a;
						var newValues = _n5.c;
						return A3(
							elm$browser$Debugger$Expando$Sequence,
							seqType,
							isClosed,
							A2(elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _n3$6;
					}
				case 'Dictionary':
					if (_n3.a.$ === 'Dictionary') {
						var _n6 = _n3.a;
						var isClosed = _n6.a;
						var _n7 = _n3.b;
						var keyValuePairs = _n7.b;
						return A2(elm$browser$Debugger$Expando$Dictionary, isClosed, keyValuePairs);
					} else {
						break _n3$6;
					}
				case 'Record':
					if (_n3.a.$ === 'Record') {
						var _n8 = _n3.a;
						var isClosed = _n8.a;
						var oldDict = _n8.b;
						var _n9 = _n3.b;
						var newDict = _n9.b;
						return A2(
							elm$browser$Debugger$Expando$Record,
							isClosed,
							A2(
								elm$core$Dict$map,
								elm$browser$Debugger$Expando$mergeDictHelp(oldDict),
								newDict));
					} else {
						break _n3$6;
					}
				default:
					if (_n3.a.$ === 'Constructor') {
						var _n10 = _n3.a;
						var isClosed = _n10.b;
						var oldValues = _n10.c;
						var _n11 = _n3.b;
						var maybeName = _n11.a;
						var newValues = _n11.c;
						return A3(
							elm$browser$Debugger$Expando$Constructor,
							maybeName,
							isClosed,
							A2(elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _n3$6;
					}
			}
		}
		return _new;
	});
var elm$browser$Debugger$Expando$mergeListHelp = F2(
	function (olds, news) {
		var _n0 = _Utils_Tuple2(olds, news);
		if (!_n0.a.b) {
			return news;
		} else {
			if (!_n0.b.b) {
				return news;
			} else {
				var _n1 = _n0.a;
				var x = _n1.a;
				var xs = _n1.b;
				var _n2 = _n0.b;
				var y = _n2.a;
				var ys = _n2.b;
				return A2(
					elm$core$List$cons,
					A2(elm$browser$Debugger$Expando$mergeHelp, x, y),
					A2(elm$browser$Debugger$Expando$mergeListHelp, xs, ys));
			}
		}
	});
var elm$browser$Debugger$Expando$merge = F2(
	function (value, expando) {
		return A2(
			elm$browser$Debugger$Expando$mergeHelp,
			expando,
			_Debugger_init(value));
	});
var elm$browser$Debugger$Expando$updateIndex = F3(
	function (n, func, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			var x = list.a;
			var xs = list.b;
			return (n <= 0) ? A2(
				elm$core$List$cons,
				func(x),
				xs) : A2(
				elm$core$List$cons,
				x,
				A3(elm$browser$Debugger$Expando$updateIndex, n - 1, func, xs));
		}
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$browser$Debugger$Expando$update = F2(
	function (msg, value) {
		switch (value.$) {
			case 'S':
				return value;
			case 'Primitive':
				return value;
			case 'Sequence':
				var seqType = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3(elm$browser$Debugger$Expando$Sequence, seqType, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _n3 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								elm$browser$Debugger$Expando$Sequence,
								seqType,
								isClosed,
								A3(
									elm$browser$Debugger$Expando$updateIndex,
									index,
									elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
			case 'Dictionary':
				var isClosed = value.a;
				var keyValuePairs = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2(elm$browser$Debugger$Expando$Dictionary, !isClosed, keyValuePairs);
					case 'Index':
						var redirect = msg.a;
						var index = msg.b;
						var subMsg = msg.c;
						switch (redirect.$) {
							case 'None':
								return value;
							case 'Key':
								return A2(
									elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_n6) {
											var k = _n6.a;
											var v = _n6.b;
											return _Utils_Tuple2(
												A2(elm$browser$Debugger$Expando$update, subMsg, k),
												v);
										},
										keyValuePairs));
							default:
								return A2(
									elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_n7) {
											var k = _n7.a;
											var v = _n7.b;
											return _Utils_Tuple2(
												k,
												A2(elm$browser$Debugger$Expando$update, subMsg, v));
										},
										keyValuePairs));
						}
					default:
						return value;
				}
			case 'Record':
				var isClosed = value.a;
				var valueDict = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2(elm$browser$Debugger$Expando$Record, !isClosed, valueDict);
					case 'Index':
						return value;
					default:
						var field = msg.a;
						var subMsg = msg.b;
						return A2(
							elm$browser$Debugger$Expando$Record,
							isClosed,
							A3(
								elm$core$Dict$update,
								field,
								elm$browser$Debugger$Expando$updateField(subMsg),
								valueDict));
				}
			default:
				var maybeName = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3(elm$browser$Debugger$Expando$Constructor, maybeName, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _n10 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								elm$browser$Debugger$Expando$Constructor,
								maybeName,
								isClosed,
								A3(
									elm$browser$Debugger$Expando$updateIndex,
									index,
									elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
		}
	});
var elm$browser$Debugger$Expando$updateField = F2(
	function (msg, maybeExpando) {
		if (maybeExpando.$ === 'Nothing') {
			return maybeExpando;
		} else {
			var expando = maybeExpando.a;
			return elm$core$Maybe$Just(
				A2(elm$browser$Debugger$Expando$update, msg, expando));
		}
	});
var elm$browser$Debugger$History$Snapshot = F2(
	function (model, messages) {
		return {messages: messages, model: model};
	});
var elm$browser$Debugger$History$addRecent = F3(
	function (msg, newModel, _n0) {
		var model = _n0.model;
		var messages = _n0.messages;
		var numMessages = _n0.numMessages;
		return _Utils_eq(numMessages, elm$browser$Debugger$History$maxSnapshotSize) ? _Utils_Tuple2(
			elm$core$Maybe$Just(
				A2(
					elm$browser$Debugger$History$Snapshot,
					model,
					elm$core$Array$fromList(messages))),
			A3(
				elm$browser$Debugger$History$RecentHistory,
				newModel,
				_List_fromArray(
					[msg]),
				1)) : _Utils_Tuple2(
			elm$core$Maybe$Nothing,
			A3(
				elm$browser$Debugger$History$RecentHistory,
				model,
				A2(elm$core$List$cons, msg, messages),
				numMessages + 1));
	});
var elm$core$Elm$JsArray$push = _JsArray_push;
var elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					elm$core$Elm$JsArray$push,
					elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, elm$core$Elm$JsArray$empty));
				return A2(elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, subTree));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(
						elm$core$Array$insertTailInTree,
						shift - elm$core$Array$shiftStep,
						index,
						tail,
						elm$core$Elm$JsArray$singleton(value)));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var originalTailLen = elm$core$Elm$JsArray$length(tail);
		var newTailLen = elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + elm$core$Array$shiftStep;
				var newTree = A4(
					elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					elm$core$Elm$JsArray$singleton(
						elm$core$Array$SubTree(tree)));
				return A4(elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4(elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4(elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			elm$core$Array$unsafeReplaceTail,
			A2(elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var elm$browser$Debugger$History$add = F3(
	function (msg, model, _n0) {
		var snapshots = _n0.snapshots;
		var recent = _n0.recent;
		var numMessages = _n0.numMessages;
		var _n1 = A3(elm$browser$Debugger$History$addRecent, msg, model, recent);
		if (_n1.a.$ === 'Just') {
			var snapshot = _n1.a.a;
			var newRecent = _n1.b;
			return A3(
				elm$browser$Debugger$History$History,
				A2(elm$core$Array$push, snapshot, snapshots),
				newRecent,
				numMessages + 1);
		} else {
			var _n2 = _n1.a;
			var newRecent = _n1.b;
			return A3(elm$browser$Debugger$History$History, snapshots, newRecent, numMessages + 1);
		}
	});
var elm$browser$Debugger$History$Stepping = F2(
	function (a, b) {
		return {$: 'Stepping', a: a, b: b};
	});
var elm$browser$Debugger$History$Done = F2(
	function (a, b) {
		return {$: 'Done', a: a, b: b};
	});
var elm$browser$Debugger$History$getHelp = F3(
	function (update, msg, getResult) {
		if (getResult.$ === 'Done') {
			return getResult;
		} else {
			var n = getResult.a;
			var model = getResult.b;
			return (!n) ? A2(
				elm$browser$Debugger$History$Done,
				msg,
				A2(update, msg, model).a) : A2(
				elm$browser$Debugger$History$Stepping,
				n - 1,
				A2(update, msg, model).a);
		}
	});
var elm$browser$Debugger$History$undone = function (getResult) {
	undone:
	while (true) {
		if (getResult.$ === 'Done') {
			var msg = getResult.a;
			var model = getResult.b;
			return _Utils_Tuple2(model, msg);
		} else {
			var $temp$getResult = getResult;
			getResult = $temp$getResult;
			continue undone;
		}
	}
};
var elm$browser$Debugger$History$get = F3(
	function (update, index, history) {
		get:
		while (true) {
			var recent = history.recent;
			var snapshotMax = history.numMessages - recent.numMessages;
			if (_Utils_cmp(index, snapshotMax) > -1) {
				return elm$browser$Debugger$History$undone(
					A3(
						elm$core$List$foldr,
						elm$browser$Debugger$History$getHelp(update),
						A2(elm$browser$Debugger$History$Stepping, index - snapshotMax, recent.model),
						recent.messages));
			} else {
				var _n0 = A2(elm$core$Array$get, (index / elm$browser$Debugger$History$maxSnapshotSize) | 0, history.snapshots);
				if (_n0.$ === 'Nothing') {
					var $temp$update = update,
						$temp$index = index,
						$temp$history = history;
					update = $temp$update;
					index = $temp$index;
					history = $temp$history;
					continue get;
				} else {
					var model = _n0.a.model;
					var messages = _n0.a.messages;
					return elm$browser$Debugger$History$undone(
						A3(
							elm$core$Array$foldr,
							elm$browser$Debugger$History$getHelp(update),
							A2(elm$browser$Debugger$History$Stepping, index % elm$browser$Debugger$History$maxSnapshotSize, model),
							messages));
				}
			}
		}
	});
var elm$browser$Debugger$Main$Paused = F3(
	function (a, b, c) {
		return {$: 'Paused', a: a, b: b, c: c};
	});
var elm$browser$Debugger$History$elmToJs = _Debugger_unsafeCoerce;
var elm$browser$Debugger$History$encodeHelp = F2(
	function (snapshot, allMessages) {
		return A3(elm$core$Array$foldl, elm$core$List$cons, allMessages, snapshot.messages);
	});
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var elm$browser$Debugger$History$encode = function (_n0) {
	var snapshots = _n0.snapshots;
	var recent = _n0.recent;
	return A2(
		elm$json$Json$Encode$list,
		elm$browser$Debugger$History$elmToJs,
		A3(
			elm$core$Array$foldr,
			elm$browser$Debugger$History$encodeHelp,
			elm$core$List$reverse(recent.messages),
			snapshots));
};
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var elm$browser$Debugger$Metadata$encodeAlias = function (_n0) {
	var args = _n0.args;
	var tipe = _n0.tipe;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string(tipe))
			]));
};
var elm$browser$Debugger$Metadata$encodeDict = F2(
	function (f, dict) {
		return elm$json$Json$Encode$object(
			elm$core$Dict$toList(
				A2(
					elm$core$Dict$map,
					F2(
						function (key, value) {
							return f(value);
						}),
					dict)));
	});
var elm$browser$Debugger$Metadata$encodeUnion = function (_n0) {
	var args = _n0.args;
	var tags = _n0.tags;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'tags',
				A2(
					elm$browser$Debugger$Metadata$encodeDict,
					elm$json$Json$Encode$list(elm$json$Json$Encode$string),
					tags))
			]));
};
var elm$browser$Debugger$Metadata$encodeTypes = function (_n0) {
	var message = _n0.message;
	var unions = _n0.unions;
	var aliases = _n0.aliases;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'message',
				elm$json$Json$Encode$string(message)),
				_Utils_Tuple2(
				'aliases',
				A2(elm$browser$Debugger$Metadata$encodeDict, elm$browser$Debugger$Metadata$encodeAlias, aliases)),
				_Utils_Tuple2(
				'unions',
				A2(elm$browser$Debugger$Metadata$encodeDict, elm$browser$Debugger$Metadata$encodeUnion, unions))
			]));
};
var elm$browser$Debugger$Metadata$encodeVersions = function (_n0) {
	var elm = _n0.elm;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'elm',
				elm$json$Json$Encode$string(elm))
			]));
};
var elm$browser$Debugger$Metadata$encode = function (_n0) {
	var versions = _n0.versions;
	var types = _n0.types;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'versions',
				elm$browser$Debugger$Metadata$encodeVersions(versions)),
				_Utils_Tuple2(
				'types',
				elm$browser$Debugger$Metadata$encodeTypes(types))
			]));
};
var elm$browser$Debugger$Main$download = F2(
	function (metadata, history) {
		var json = elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'metadata',
					elm$browser$Debugger$Metadata$encode(metadata)),
					_Utils_Tuple2(
					'history',
					elm$browser$Debugger$History$encode(history))
				]));
		var historyLength = elm$browser$Debugger$History$size(history);
		return A2(
			elm$core$Task$perform,
			function (_n0) {
				return elm$browser$Debugger$Main$NoOp;
			},
			A2(_Debugger_download, historyLength, json));
	});
var elm$browser$Debugger$History$jsToElm = _Debugger_unsafeCoerce;
var elm$json$Json$Decode$value = _Json_decodeValue;
var elm$browser$Debugger$History$decoder = F2(
	function (initialModel, update) {
		var addMessage = F2(
			function (rawMsg, _n0) {
				var model = _n0.a;
				var history = _n0.b;
				var msg = elm$browser$Debugger$History$jsToElm(rawMsg);
				return _Utils_Tuple2(
					A2(update, msg, model),
					A3(elm$browser$Debugger$History$add, msg, model, history));
			});
		var updateModel = function (rawMsgs) {
			return A3(
				elm$core$List$foldl,
				addMessage,
				_Utils_Tuple2(
					initialModel,
					elm$browser$Debugger$History$empty(initialModel)),
				rawMsgs);
		};
		return A2(
			elm$json$Json$Decode$map,
			updateModel,
			elm$json$Json$Decode$list(elm$json$Json$Decode$value));
	});
var elm$browser$Debugger$History$getInitialModel = function (_n0) {
	var snapshots = _n0.snapshots;
	var recent = _n0.recent;
	var _n1 = A2(elm$core$Array$get, 0, snapshots);
	if (_n1.$ === 'Just') {
		var model = _n1.a.model;
		return model;
	} else {
		return recent.model;
	}
};
var elm$browser$Debugger$Overlay$BadImport = function (a) {
	return {$: 'BadImport', a: a};
};
var elm$browser$Debugger$Report$CorruptHistory = {$: 'CorruptHistory'};
var elm$browser$Debugger$Overlay$corruptImport = elm$browser$Debugger$Overlay$BadImport(elm$browser$Debugger$Report$CorruptHistory);
var elm$browser$Debugger$Main$loadNewHistory = F3(
	function (rawHistory, update, model) {
		var pureUserUpdate = F2(
			function (msg, userModel) {
				return A2(update, msg, userModel).a;
			});
		var initialUserModel = elm$browser$Debugger$History$getInitialModel(model.history);
		var decoder = A2(elm$browser$Debugger$History$decoder, initialUserModel, pureUserUpdate);
		var _n0 = A2(elm$json$Json$Decode$decodeValue, decoder, rawHistory);
		if (_n0.$ === 'Err') {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{overlay: elm$browser$Debugger$Overlay$corruptImport}),
				elm$core$Platform$Cmd$none);
		} else {
			var _n1 = _n0.a;
			var latestUserModel = _n1.a;
			var newHistory = _n1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						expando: elm$browser$Debugger$Expando$init(latestUserModel),
						history: newHistory,
						overlay: elm$browser$Debugger$Overlay$none,
						state: elm$browser$Debugger$Main$Running(latestUserModel)
					}),
				elm$core$Platform$Cmd$none);
		}
	});
var elm$browser$Debugger$Main$scroll = function (popout) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$always(elm$browser$Debugger$Main$NoOp),
		_Debugger_scroll(popout));
};
var elm$browser$Debugger$Main$Upload = function (a) {
	return {$: 'Upload', a: a};
};
var elm$browser$Debugger$Main$upload = A2(
	elm$core$Task$perform,
	elm$browser$Debugger$Main$Upload,
	_Debugger_upload(_Utils_Tuple0));
var elm$browser$Debugger$Overlay$BadMetadata = function (a) {
	return {$: 'BadMetadata', a: a};
};
var elm$browser$Debugger$Overlay$badMetadata = elm$browser$Debugger$Overlay$BadMetadata;
var elm$browser$Debugger$Main$withGoodMetadata = F2(
	function (model, func) {
		var _n0 = model.metadata;
		if (_n0.$ === 'Ok') {
			var metadata = _n0.a;
			return func(metadata);
		} else {
			var error = _n0.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						overlay: elm$browser$Debugger$Overlay$badMetadata(error)
					}),
				elm$core$Platform$Cmd$none);
		}
	});
var elm$browser$Debugger$Report$AliasChange = function (a) {
	return {$: 'AliasChange', a: a};
};
var elm$browser$Debugger$Metadata$checkAlias = F4(
	function (name, old, _new, changes) {
		return (_Utils_eq(old.tipe, _new.tipe) && _Utils_eq(old.args, _new.args)) ? changes : A2(
			elm$core$List$cons,
			elm$browser$Debugger$Report$AliasChange(name),
			changes);
	});
var elm$browser$Debugger$Metadata$addTag = F3(
	function (tag, _n0, changes) {
		return _Utils_update(
			changes,
			{
				added: A2(elm$core$List$cons, tag, changes.added)
			});
	});
var elm$browser$Debugger$Metadata$checkTag = F4(
	function (tag, old, _new, changes) {
		return _Utils_eq(old, _new) ? changes : _Utils_update(
			changes,
			{
				changed: A2(elm$core$List$cons, tag, changes.changed)
			});
	});
var elm$browser$Debugger$Metadata$removeTag = F3(
	function (tag, _n0, changes) {
		return _Utils_update(
			changes,
			{
				removed: A2(elm$core$List$cons, tag, changes.removed)
			});
	});
var elm$browser$Debugger$Report$UnionChange = F2(
	function (a, b) {
		return {$: 'UnionChange', a: a, b: b};
	});
var elm$browser$Debugger$Report$TagChanges = F4(
	function (removed, changed, added, argsMatch) {
		return {added: added, argsMatch: argsMatch, changed: changed, removed: removed};
	});
var elm$browser$Debugger$Report$emptyTagChanges = function (argsMatch) {
	return A4(elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, argsMatch);
};
var elm$browser$Debugger$Report$hasTagChanges = function (tagChanges) {
	return _Utils_eq(
		tagChanges,
		A4(elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, true));
};
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$browser$Debugger$Metadata$checkUnion = F4(
	function (name, old, _new, changes) {
		var tagChanges = A6(
			elm$core$Dict$merge,
			elm$browser$Debugger$Metadata$removeTag,
			elm$browser$Debugger$Metadata$checkTag,
			elm$browser$Debugger$Metadata$addTag,
			old.tags,
			_new.tags,
			elm$browser$Debugger$Report$emptyTagChanges(
				_Utils_eq(old.args, _new.args)));
		return elm$browser$Debugger$Report$hasTagChanges(tagChanges) ? changes : A2(
			elm$core$List$cons,
			A2(elm$browser$Debugger$Report$UnionChange, name, tagChanges),
			changes);
	});
var elm$browser$Debugger$Metadata$ignore = F3(
	function (key, value, report) {
		return report;
	});
var elm$browser$Debugger$Report$MessageChanged = F2(
	function (a, b) {
		return {$: 'MessageChanged', a: a, b: b};
	});
var elm$browser$Debugger$Report$SomethingChanged = function (a) {
	return {$: 'SomethingChanged', a: a};
};
var elm$browser$Debugger$Metadata$checkTypes = F2(
	function (old, _new) {
		return (!_Utils_eq(old.message, _new.message)) ? A2(elm$browser$Debugger$Report$MessageChanged, old.message, _new.message) : elm$browser$Debugger$Report$SomethingChanged(
			A6(
				elm$core$Dict$merge,
				elm$browser$Debugger$Metadata$ignore,
				elm$browser$Debugger$Metadata$checkUnion,
				elm$browser$Debugger$Metadata$ignore,
				old.unions,
				_new.unions,
				A6(elm$core$Dict$merge, elm$browser$Debugger$Metadata$ignore, elm$browser$Debugger$Metadata$checkAlias, elm$browser$Debugger$Metadata$ignore, old.aliases, _new.aliases, _List_Nil)));
	});
var elm$browser$Debugger$Report$VersionChanged = F2(
	function (a, b) {
		return {$: 'VersionChanged', a: a, b: b};
	});
var elm$browser$Debugger$Metadata$check = F2(
	function (old, _new) {
		return (!_Utils_eq(old.versions.elm, _new.versions.elm)) ? A2(elm$browser$Debugger$Report$VersionChanged, old.versions.elm, _new.versions.elm) : A2(elm$browser$Debugger$Metadata$checkTypes, old.types, _new.types);
	});
var elm$browser$Debugger$Overlay$RiskyImport = F2(
	function (a, b) {
		return {$: 'RiskyImport', a: a, b: b};
	});
var elm$browser$Debugger$Overlay$uploadDecoder = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, y);
		}),
	A2(elm$json$Json$Decode$field, 'metadata', elm$browser$Debugger$Metadata$decoder),
	A2(elm$json$Json$Decode$field, 'history', elm$json$Json$Decode$value));
var elm$browser$Debugger$Report$Fine = {$: 'Fine'};
var elm$browser$Debugger$Report$Impossible = {$: 'Impossible'};
var elm$browser$Debugger$Report$Risky = {$: 'Risky'};
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$browser$Debugger$Report$some = function (list) {
	return !elm$core$List$isEmpty(list);
};
var elm$browser$Debugger$Report$evaluateChange = function (change) {
	if (change.$ === 'AliasChange') {
		return elm$browser$Debugger$Report$Impossible;
	} else {
		var removed = change.b.removed;
		var changed = change.b.changed;
		var added = change.b.added;
		var argsMatch = change.b.argsMatch;
		return ((!argsMatch) || (elm$browser$Debugger$Report$some(changed) || elm$browser$Debugger$Report$some(removed))) ? elm$browser$Debugger$Report$Impossible : (elm$browser$Debugger$Report$some(added) ? elm$browser$Debugger$Report$Risky : elm$browser$Debugger$Report$Fine);
	}
};
var elm$browser$Debugger$Report$worstCase = F2(
	function (status, statusList) {
		worstCase:
		while (true) {
			if (!statusList.b) {
				return status;
			} else {
				switch (statusList.a.$) {
					case 'Impossible':
						var _n1 = statusList.a;
						return elm$browser$Debugger$Report$Impossible;
					case 'Risky':
						var _n2 = statusList.a;
						var rest = statusList.b;
						var $temp$status = elm$browser$Debugger$Report$Risky,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
					default:
						var _n3 = statusList.a;
						var rest = statusList.b;
						var $temp$status = status,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
				}
			}
		}
	});
var elm$browser$Debugger$Report$evaluate = function (report) {
	switch (report.$) {
		case 'CorruptHistory':
			return elm$browser$Debugger$Report$Impossible;
		case 'VersionChanged':
			return elm$browser$Debugger$Report$Impossible;
		case 'MessageChanged':
			return elm$browser$Debugger$Report$Impossible;
		default:
			var changes = report.a;
			return A2(
				elm$browser$Debugger$Report$worstCase,
				elm$browser$Debugger$Report$Fine,
				A2(elm$core$List$map, elm$browser$Debugger$Report$evaluateChange, changes));
	}
};
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$browser$Debugger$Overlay$assessImport = F2(
	function (metadata, jsonString) {
		var _n0 = A2(elm$json$Json$Decode$decodeString, elm$browser$Debugger$Overlay$uploadDecoder, jsonString);
		if (_n0.$ === 'Err') {
			return elm$core$Result$Err(elm$browser$Debugger$Overlay$corruptImport);
		} else {
			var _n1 = _n0.a;
			var foreignMetadata = _n1.a;
			var rawHistory = _n1.b;
			var report = A2(elm$browser$Debugger$Metadata$check, foreignMetadata, metadata);
			var _n2 = elm$browser$Debugger$Report$evaluate(report);
			switch (_n2.$) {
				case 'Impossible':
					return elm$core$Result$Err(
						elm$browser$Debugger$Overlay$BadImport(report));
				case 'Risky':
					return elm$core$Result$Err(
						A2(elm$browser$Debugger$Overlay$RiskyImport, report, rawHistory));
				default:
					return elm$core$Result$Ok(rawHistory);
			}
		}
	});
var elm$browser$Debugger$Overlay$close = F2(
	function (msg, state) {
		switch (state.$) {
			case 'None':
				return elm$core$Maybe$Nothing;
			case 'BadMetadata':
				return elm$core$Maybe$Nothing;
			case 'BadImport':
				return elm$core$Maybe$Nothing;
			default:
				var rawHistory = state.b;
				if (msg.$ === 'Cancel') {
					return elm$core$Maybe$Nothing;
				} else {
					return elm$core$Maybe$Just(rawHistory);
				}
		}
	});
var elm$browser$Debugger$Main$wrapUpdate = F3(
	function (update, msg, model) {
		wrapUpdate:
		while (true) {
			switch (msg.$) {
				case 'NoOp':
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				case 'UserMsg':
					var userMsg = msg.a;
					var userModel = elm$browser$Debugger$Main$getLatestModel(model.state);
					var newHistory = A3(elm$browser$Debugger$History$add, userMsg, userModel, model.history);
					var _n1 = A2(update, userMsg, userModel);
					var newUserModel = _n1.a;
					var userCmds = _n1.b;
					var commands = A2(elm$core$Platform$Cmd$map, elm$browser$Debugger$Main$UserMsg, userCmds);
					var _n2 = model.state;
					if (_n2.$ === 'Running') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expando: A2(elm$browser$Debugger$Expando$merge, newUserModel, model.expando),
									history: newHistory,
									state: elm$browser$Debugger$Main$Running(newUserModel)
								}),
							elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										commands,
										elm$browser$Debugger$Main$scroll(model.popout)
									])));
					} else {
						var index = _n2.a;
						var indexModel = _n2.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									history: newHistory,
									state: A3(elm$browser$Debugger$Main$Paused, index, indexModel, newUserModel)
								}),
							commands);
					}
				case 'ExpandoMsg':
					var eMsg = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expando: A2(elm$browser$Debugger$Expando$update, eMsg, model.expando)
							}),
						elm$core$Platform$Cmd$none);
				case 'Resume':
					var _n3 = model.state;
					if (_n3.$ === 'Running') {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var userModel = _n3.c;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expando: A2(elm$browser$Debugger$Expando$merge, userModel, model.expando),
									state: elm$browser$Debugger$Main$Running(userModel)
								}),
							elm$browser$Debugger$Main$scroll(model.popout));
					}
				case 'Jump':
					var index = msg.a;
					var _n4 = A3(elm$browser$Debugger$History$get, update, index, model.history);
					var indexModel = _n4.a;
					var indexMsg = _n4.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expando: A2(elm$browser$Debugger$Expando$merge, indexModel, model.expando),
								state: A3(
									elm$browser$Debugger$Main$Paused,
									index,
									indexModel,
									elm$browser$Debugger$Main$getLatestModel(model.state))
							}),
						elm$core$Platform$Cmd$none);
				case 'Open':
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Task$perform,
							function (_n5) {
								return elm$browser$Debugger$Main$NoOp;
							},
							_Debugger_open(model.popout)));
				case 'Up':
					var index = function () {
						var _n6 = model.state;
						if (_n6.$ === 'Paused') {
							var i = _n6.a;
							return i;
						} else {
							return elm$browser$Debugger$History$size(model.history);
						}
					}();
					if (index > 0) {
						var $temp$update = update,
							$temp$msg = elm$browser$Debugger$Main$Jump(index - 1),
							$temp$model = model;
						update = $temp$update;
						msg = $temp$msg;
						model = $temp$model;
						continue wrapUpdate;
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				case 'Down':
					var _n7 = model.state;
					if (_n7.$ === 'Running') {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var index = _n7.a;
						var userModel = _n7.c;
						if (_Utils_eq(
							index,
							elm$browser$Debugger$History$size(model.history) - 1)) {
							var $temp$update = update,
								$temp$msg = elm$browser$Debugger$Main$Resume,
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							var $temp$update = update,
								$temp$msg = elm$browser$Debugger$Main$Jump(index + 1),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						}
					}
				case 'Import':
					return A2(
						elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (_n8) {
							return _Utils_Tuple2(model, elm$browser$Debugger$Main$upload);
						});
				case 'Export':
					return A2(
						elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							return _Utils_Tuple2(
								model,
								A2(elm$browser$Debugger$Main$download, metadata, model.history));
						});
				case 'Upload':
					var jsonString = msg.a;
					return A2(
						elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							var _n9 = A2(elm$browser$Debugger$Overlay$assessImport, metadata, jsonString);
							if (_n9.$ === 'Err') {
								var newOverlay = _n9.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{overlay: newOverlay}),
									elm$core$Platform$Cmd$none);
							} else {
								var rawHistory = _n9.a;
								return A3(elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
							}
						});
				default:
					var overlayMsg = msg.a;
					var _n10 = A2(elm$browser$Debugger$Overlay$close, overlayMsg, model.overlay);
					if (_n10.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{overlay: elm$browser$Debugger$Overlay$none}),
							elm$core$Platform$Cmd$none);
					} else {
						var rawHistory = _n10.a;
						return A3(elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
					}
			}
		}
	});
var elm$core$Set$foldr = F3(
	function (func, initialState, _n0) {
		var dict = _n0.a;
		return A3(
			elm$core$Dict$foldr,
			F3(
				function (key, _n1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Dom$focus = _Browser_call('focus');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(
					elm$core$Task$onError,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Err),
					A2(
						elm$core$Task$andThen,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
							elm$core$Result$Ok),
						task))));
	});
var author$project$Form$DatePicker$Internal$openTimeSelect = function (timeSelect) {
	switch (timeSelect.$) {
		case 'Hours':
			return A2(
				elm$core$Task$attempt,
				author$project$Form$DatePicker$Internal$DomFocus,
				elm$browser$Browser$Dom$focus('FORM_DATEPICKER_HOURS'));
		case 'Minutes':
			return A2(
				elm$core$Task$attempt,
				author$project$Form$DatePicker$Internal$DomFocus,
				elm$browser$Browser$Dom$focus('FORM_DATEPICKER_MINUTES'));
		default:
			return A2(
				elm$core$Task$attempt,
				author$project$Form$DatePicker$Internal$DomFocus,
				elm$browser$Browser$Dom$focus('FORM_DATEPICKER_SECONDS'));
	}
};
var author$project$Form$Select$Internal$getIsOpen = function ($) {
	return $.isOpen;
};
var author$project$Form$Select$getIsOpen = function (_n0) {
	var state = _n0.a;
	return author$project$Form$Select$Internal$getIsOpen(state);
};
var author$project$Resettable$getValue = function (resettable) {
	if (resettable.$ === 'Initial') {
		var initialValue = resettable.a;
		return initialValue;
	} else {
		var updatedValue = resettable.b;
		return updatedValue;
	}
};
var author$project$Form$Select$Internal$getSelectedOption = function (state) {
	return author$project$Resettable$getValue(state.selectedOption);
};
var author$project$Form$Select$getSelectedOption = function (_n0) {
	var state = _n0.a;
	return author$project$Form$Select$Internal$getSelectedOption(state);
};
var author$project$Form$Select$Internal$setInitialOption = F2(
	function (selectedOption, state) {
		return _Utils_update(
			state,
			{
				selectedOption: author$project$Resettable$init(selectedOption)
			});
	});
var author$project$Form$Select$setInitialOption = F2(
	function (selectedOption, _n0) {
		var state = _n0.a;
		return author$project$Form$Select$Model(
			A2(author$project$Form$Select$Internal$setInitialOption, selectedOption, state));
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$String$toLower = _String_toLower;
var author$project$Form$Select$Internal$filterOptions = F3(
	function (searchText, toLabel, options) {
		return A2(
			elm$core$List$filter,
			A2(
				elm$core$Basics$composeR,
				toLabel,
				A2(
					elm$core$Basics$composeR,
					elm$core$String$toLower,
					elm$core$String$contains(searchText))),
			options);
	});
var elm$core$Debug$log = _Debug_log;
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm_community$list_extra$List$Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					var $temp$predicate = predicate,
						$temp$list = xs;
					predicate = $temp$predicate;
					list = $temp$list;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var author$project$Form$Select$Internal$getNextOption = F4(
	function (options, mFocusedOption, searchText, toLabel) {
		var filteredOptions = A2(
			elm$core$Debug$log,
			'filter',
			A3(author$project$Form$Select$Internal$filterOptions, searchText, toLabel, options));
		var mFilteredFocusOption = A2(
			elm$core$Maybe$andThen,
			function (option) {
				return A2(elm$core$List$member, option, filteredOptions) ? elm$core$Maybe$Just(option) : elm$core$Maybe$Nothing;
			},
			mFocusedOption);
		if (mFilteredFocusOption.$ === 'Nothing') {
			return elm$core$List$head(filteredOptions);
		} else {
			var focusedOption = mFilteredFocusOption.a;
			return elm$core$List$head(
				A2(
					elm$core$List$drop,
					1,
					A2(
						elm_community$list_extra$List$Extra$dropWhile,
						elm$core$Basics$neq(focusedOption),
						filteredOptions)));
		}
	});
var author$project$Form$Select$Internal$getPreviousOption = F4(
	function (options, focusedOption, searchText, toLabel) {
		return A4(
			author$project$Form$Select$Internal$getNextOption,
			elm$core$List$reverse(options),
			focusedOption,
			searchText,
			toLabel);
	});
var author$project$Resettable$Updated = F2(
	function (a, b) {
		return {$: 'Updated', a: a, b: b};
	});
var author$project$Resettable$update = F2(
	function (newValue, resettable) {
		if (resettable.$ === 'Initial') {
			var initialValue = resettable.a;
			var _n1 = _Utils_eq(newValue, initialValue);
			if (_n1) {
				return resettable;
			} else {
				return A2(author$project$Resettable$Updated, initialValue, newValue);
			}
		} else {
			var initialValue = resettable.a;
			var currentValue = resettable.b;
			var _n2 = _Utils_Tuple2(
				_Utils_eq(currentValue, newValue),
				_Utils_eq(initialValue, newValue));
			if (_n2.a) {
				return resettable;
			} else {
				if (_n2.b) {
					return author$project$Resettable$Initial(initialValue);
				} else {
					return A2(author$project$Resettable$Updated, initialValue, newValue);
				}
			}
		}
	});
var author$project$Form$Select$Internal$updateSelectedOption = F2(
	function (option, state) {
		return _Utils_update(
			state,
			{
				focusedOption: elm$core$Maybe$Nothing,
				isOpen: false,
				searchText: '',
				selectedOption: A2(
					author$project$Resettable$update,
					elm$core$Maybe$Just(option),
					state.selectedOption)
			});
	});
var elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm$core$String$slice, 0, -n, string);
	});
var mgold$elm_nonempty_list$List$Nonempty$toList = function (_n0) {
	var x = _n0.a;
	var xs = _n0.b;
	return A2(elm$core$List$cons, x, xs);
};
var author$project$Form$Select$Internal$update = F2(
	function (msg, state) {
		switch (msg.$) {
			case 'Open':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{isOpen: true}),
					elm$core$Platform$Cmd$none);
			case 'Blur':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{focusedOption: elm$core$Maybe$Nothing, isOpen: false, searchText: ''}),
					elm$core$Platform$Cmd$none);
			case 'Select':
				var option = msg.a;
				return _Utils_Tuple2(
					A2(author$project$Form$Select$Internal$updateSelectedOption, option, state),
					elm$core$Platform$Cmd$none);
			case 'Clear':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							selectedOption: A2(author$project$Resettable$update, elm$core$Maybe$Nothing, state.selectedOption)
						}),
					elm$core$Platform$Cmd$none);
			case 'SelectKey':
				switch (msg.c.$) {
					case 'Up':
						var toLabel = msg.b;
						var _n1 = msg.c;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									focusedOption: A4(
										author$project$Form$Select$Internal$getPreviousOption,
										mgold$elm_nonempty_list$List$Nonempty$toList(state.options),
										state.focusedOption,
										state.searchText,
										toLabel)
								}),
							elm$core$Platform$Cmd$none);
					case 'Down':
						var toLabel = msg.b;
						var _n2 = msg.c;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									focusedOption: A4(
										author$project$Form$Select$Internal$getNextOption,
										mgold$elm_nonempty_list$List$Nonempty$toList(state.options),
										state.focusedOption,
										state.searchText,
										toLabel)
								}),
							elm$core$Platform$Cmd$none);
					case 'Backspace':
						var _n3 = msg.c;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									searchText: A2(elm$core$String$dropRight, 1, state.searchText)
								}),
							elm$core$Platform$Cmd$none);
					case 'AlphaNum':
						var toLabel = msg.b;
						var charString = msg.c.a;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									searchText: _Utils_ap(state.searchText, charString)
								}),
							elm$core$Platform$Cmd$none);
					default:
						var isOptionDisabled = msg.a;
						var _n4 = state.focusedOption;
						if (_n4.$ === 'Nothing') {
							return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
						} else {
							var focusedOption = _n4.a;
							var _n5 = isOptionDisabled(focusedOption);
							if (_n5) {
								return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									A2(author$project$Form$Select$Internal$updateSelectedOption, focusedOption, state),
									elm$core$Platform$Cmd$none);
							}
						}
				}
			default:
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
		}
	});
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var author$project$Form$Select$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return A2(
			elm$core$Tuple$mapFirst,
			author$project$Form$Select$Model,
			A2(author$project$Form$Select$Internal$update, msg, state));
	});
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var isaacseymour$deprecated_time$Time$Date$clampDay = function (day_) {
	return A3(elm$core$Basics$clamp, 1, 31, day_);
};
var isaacseymour$deprecated_time$Time$Date$Apr = {$: 'Apr'};
var isaacseymour$deprecated_time$Time$Date$Aug = {$: 'Aug'};
var isaacseymour$deprecated_time$Time$Date$Dec = {$: 'Dec'};
var isaacseymour$deprecated_time$Time$Date$Feb = {$: 'Feb'};
var isaacseymour$deprecated_time$Time$Date$Jan = {$: 'Jan'};
var isaacseymour$deprecated_time$Time$Date$Jul = {$: 'Jul'};
var isaacseymour$deprecated_time$Time$Date$Jun = {$: 'Jun'};
var isaacseymour$deprecated_time$Time$Date$Mar = {$: 'Mar'};
var isaacseymour$deprecated_time$Time$Date$May = {$: 'May'};
var isaacseymour$deprecated_time$Time$Date$Nov = {$: 'Nov'};
var isaacseymour$deprecated_time$Time$Date$Oct = {$: 'Oct'};
var isaacseymour$deprecated_time$Time$Date$Sep = {$: 'Sep'};
var isaacseymour$deprecated_time$Time$Date$clampMonth = function (month_) {
	switch (month_) {
		case 2:
			return isaacseymour$deprecated_time$Time$Date$Feb;
		case 3:
			return isaacseymour$deprecated_time$Time$Date$Mar;
		case 4:
			return isaacseymour$deprecated_time$Time$Date$Apr;
		case 5:
			return isaacseymour$deprecated_time$Time$Date$May;
		case 6:
			return isaacseymour$deprecated_time$Time$Date$Jun;
		case 7:
			return isaacseymour$deprecated_time$Time$Date$Jul;
		case 8:
			return isaacseymour$deprecated_time$Time$Date$Aug;
		case 9:
			return isaacseymour$deprecated_time$Time$Date$Sep;
		case 10:
			return isaacseymour$deprecated_time$Time$Date$Oct;
		case 11:
			return isaacseymour$deprecated_time$Time$Date$Nov;
		default:
			var other = month_;
			return (other <= 1) ? isaacseymour$deprecated_time$Time$Date$Jan : isaacseymour$deprecated_time$Time$Date$Dec;
	}
};
var isaacseymour$deprecated_time$Time$Date$Date = function (a) {
	return {$: 'Date', a: a};
};
var isaacseymour$deprecated_time$Time$Date$isLeapYear = function (y) {
	return ((!A2(elm$core$Basics$modBy, 400, y)) || (A2(elm$core$Basics$modBy, 100, y) && (!A2(elm$core$Basics$modBy, 4, y)))) ? true : false;
};
var isaacseymour$deprecated_time$Time$Date$daysInMonth = F2(
	function (y, m) {
		var _n0 = isaacseymour$deprecated_time$Time$Date$clampMonth(m);
		switch (_n0.$) {
			case 'Feb':
				return isaacseymour$deprecated_time$Time$Date$isLeapYear(y) ? 29 : 28;
			case 'Apr':
				return 30;
			case 'Jun':
				return 30;
			case 'Sep':
				return 30;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var isaacseymour$deprecated_time$Time$Date$isValidDate = F3(
	function (year_, month_, day_) {
		return (day_ >= 1) && (_Utils_cmp(
			day_,
			A2(isaacseymour$deprecated_time$Time$Date$daysInMonth, year_, month_)) < 1);
	});
var isaacseymour$deprecated_time$Time$Date$monthToInt = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var isaacseymour$deprecated_time$Time$Date$firstValid = F3(
	function (year_, month_, day_) {
		var monthInt = isaacseymour$deprecated_time$Time$Date$monthToInt(month_);
		var _n0 = A3(isaacseymour$deprecated_time$Time$Date$isValidDate, year_, monthInt, day_) ? _Utils_Tuple3(year_, month_, day_) : (A3(isaacseymour$deprecated_time$Time$Date$isValidDate, year_, monthInt, day_ - 1) ? _Utils_Tuple3(year_, month_, day_ - 1) : (A3(isaacseymour$deprecated_time$Time$Date$isValidDate, year_, monthInt, day_ - 2) ? _Utils_Tuple3(year_, month_, day_ - 2) : _Utils_Tuple3(year_, month_, day_ - 3)));
		var y = _n0.a;
		var m = _n0.b;
		var d = _n0.c;
		return isaacseymour$deprecated_time$Time$Date$Date(
			{day: d, month: m, year: y});
	});
var isaacseymour$deprecated_time$Time$Date$date = F3(
	function (year_, month_, day_) {
		return A3(
			isaacseymour$deprecated_time$Time$Date$firstValid,
			year_,
			isaacseymour$deprecated_time$Time$Date$clampMonth(month_),
			isaacseymour$deprecated_time$Time$Date$clampDay(day_));
	});
var isaacseymour$deprecated_time$Time$Date$addMonths = F2(
	function (months, _n0) {
		var d = _n0.a;
		var ms = (((d.year * 12) + isaacseymour$deprecated_time$Time$Date$monthToInt(d.month)) - 1) + months;
		var yo = (ms < 0) ? (-1) : 0;
		return A3(
			isaacseymour$deprecated_time$Time$Date$date,
			(((ms - yo) / 12) | 0) + yo,
			A2(elm$core$Basics$modBy, 12, ms) + 1,
			d.day);
	});
var isaacseymour$deprecated_time$Time$DateTime$DateTime = function (a) {
	return {$: 'DateTime', a: a};
};
var isaacseymour$deprecated_time$Time$DateTime$addMonths = F2(
	function (months, _n0) {
		var data = _n0.a;
		return isaacseymour$deprecated_time$Time$DateTime$DateTime(
			{
				date: A2(isaacseymour$deprecated_time$Time$Date$addMonths, months, data.date),
				offset: data.offset
			});
	});
var isaacseymour$deprecated_time$Time$Date$daysFromYear = function (y) {
	return (y > 0) ? ((((366 + ((y - 1) * 365)) + (((y - 1) / 4) | 0)) - (((y - 1) / 100) | 0)) + (((y - 1) / 400) | 0)) : ((y < 0) ? ((((y * 365) + ((y / 4) | 0)) - ((y / 100) | 0)) + ((y / 400) | 0)) : 0);
};
var isaacseymour$deprecated_time$Time$Date$yearFromDays = function (ds) {
	var y = (ds / 365) | 0;
	var d = isaacseymour$deprecated_time$Time$Date$daysFromYear(y);
	return (_Utils_cmp(ds, d) < 1) ? (y - 1) : y;
};
var isaacseymour$deprecated_time$Time$Date$dateFromDays = function (ds) {
	var d400 = isaacseymour$deprecated_time$Time$Date$daysFromYear(400);
	var y400 = (ds / d400) | 0;
	var d = ds % d400;
	var year_ = isaacseymour$deprecated_time$Time$Date$yearFromDays(d + 1);
	var doy = d - isaacseymour$deprecated_time$Time$Date$daysFromYear(year_);
	var leap = isaacseymour$deprecated_time$Time$Date$isLeapYear(year_) ? elm$core$Basics$add(1) : elm$core$Basics$identity;
	var _n0 = (doy < 31) ? _Utils_Tuple2(isaacseymour$deprecated_time$Time$Date$Jan, doy + 1) : ((_Utils_cmp(
		doy,
		leap(59)) < 0) ? _Utils_Tuple2(isaacseymour$deprecated_time$Time$Date$Feb, (doy - 31) + 1) : ((_Utils_cmp(
		doy,
		leap(90)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Mar,
		(doy - leap(59)) + 1) : ((_Utils_cmp(
		doy,
		leap(120)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Apr,
		(doy - leap(90)) + 1) : ((_Utils_cmp(
		doy,
		leap(151)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$May,
		(doy - leap(120)) + 1) : ((_Utils_cmp(
		doy,
		leap(181)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Jun,
		(doy - leap(151)) + 1) : ((_Utils_cmp(
		doy,
		leap(212)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Jul,
		(doy - leap(181)) + 1) : ((_Utils_cmp(
		doy,
		leap(243)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Aug,
		(doy - leap(212)) + 1) : ((_Utils_cmp(
		doy,
		leap(273)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Sep,
		(doy - leap(243)) + 1) : ((_Utils_cmp(
		doy,
		leap(304)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Oct,
		(doy - leap(273)) + 1) : ((_Utils_cmp(
		doy,
		leap(334)) < 0) ? _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Nov,
		(doy - leap(304)) + 1) : _Utils_Tuple2(
		isaacseymour$deprecated_time$Time$Date$Dec,
		(doy - leap(334)) + 1)))))))))));
	var month_ = _n0.a;
	var day_ = _n0.b;
	return isaacseymour$deprecated_time$Time$Date$Date(
		{day: day_, month: month_, year: year_ + (y400 * 400)});
};
var isaacseymour$deprecated_time$Time$Date$prevMonth = function (m) {
	switch (m.$) {
		case 'Jan':
			return elm$core$Maybe$Nothing;
		case 'Feb':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Jan);
		case 'Mar':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Feb);
		case 'Apr':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Mar);
		case 'May':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Apr);
		case 'Jun':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$May);
		case 'Jul':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Jun);
		case 'Aug':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Jul);
		case 'Sep':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Aug);
		case 'Oct':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Sep);
		case 'Nov':
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Oct);
		default:
			return elm$core$Maybe$Just(isaacseymour$deprecated_time$Time$Date$Nov);
	}
};
var isaacseymour$deprecated_time$Time$Date$daysFromYearMonth = F2(
	function (year_, month_) {
		var go = F3(
			function (y, m, acc) {
				go:
				while (true) {
					if (m.$ === 'Nothing') {
						return acc;
					} else {
						var m_ = m.a;
						var $temp$y = y,
							$temp$m = isaacseymour$deprecated_time$Time$Date$prevMonth(m_),
							$temp$acc = acc + A2(
							isaacseymour$deprecated_time$Time$Date$daysInMonth,
							y,
							isaacseymour$deprecated_time$Time$Date$monthToInt(m_));
						y = $temp$y;
						m = $temp$m;
						acc = $temp$acc;
						continue go;
					}
				}
			});
		return A3(
			go,
			year_,
			isaacseymour$deprecated_time$Time$Date$prevMonth(month_),
			0);
	});
var isaacseymour$deprecated_time$Time$Date$daysFromYearMonthDay = F3(
	function (year_, month_, day_) {
		var yds = isaacseymour$deprecated_time$Time$Date$daysFromYear(year_);
		var mds = A2(isaacseymour$deprecated_time$Time$Date$daysFromYearMonth, year_, month_);
		var dds = day_ - 1;
		return (yds + mds) + dds;
	});
var isaacseymour$deprecated_time$Time$Date$addDays = F2(
	function (days, _n0) {
		var d = _n0.a;
		return isaacseymour$deprecated_time$Time$Date$dateFromDays(
			days + A3(isaacseymour$deprecated_time$Time$Date$daysFromYearMonthDay, d.year, d.month, d.day));
	});
var isaacseymour$deprecated_time$Time$Internal$dayMs = 86400000;
var isaacseymour$deprecated_time$Time$DateTime$addMilliseconds = F2(
	function (ms, _n0) {
		var data = _n0.a;
		var total = ms + data.offset;
		var _n1 = function () {
			if (total < 0) {
				var offset = total % isaacseymour$deprecated_time$Time$Internal$dayMs;
				var days_ = -(((elm$core$Basics$abs(total) / isaacseymour$deprecated_time$Time$Internal$dayMs) | 0) + 1);
				return (!offset) ? _Utils_Tuple2(days_ + 1, 0) : _Utils_Tuple2(days_, isaacseymour$deprecated_time$Time$Internal$dayMs + (offset % isaacseymour$deprecated_time$Time$Internal$dayMs));
			} else {
				return _Utils_Tuple2((total / isaacseymour$deprecated_time$Time$Internal$dayMs) | 0, total % isaacseymour$deprecated_time$Time$Internal$dayMs);
			}
		}();
		var days = _n1.a;
		var newOffset = _n1.b;
		return isaacseymour$deprecated_time$Time$DateTime$DateTime(
			{
				date: A2(isaacseymour$deprecated_time$Time$Date$addDays, days, data.date),
				offset: newOffset
			});
	});
var isaacseymour$deprecated_time$Time$Internal$hourMs = 3600000;
var isaacseymour$deprecated_time$Time$Internal$secondMs = 1000;
var isaacseymour$deprecated_time$Time$Internal$offsetFromTimeData = function (_n0) {
	var hour = _n0.hour;
	var minute = _n0.minute;
	var second = _n0.second;
	var millisecond = _n0.millisecond;
	return (((A3(elm$core$Basics$clamp, 0, 23, hour) * isaacseymour$deprecated_time$Time$Internal$hourMs) + (A3(elm$core$Basics$clamp, 0, 59, minute) * isaacseymour$deprecated_time$Time$Internal$minuteMs)) + (A3(elm$core$Basics$clamp, 0, 59, second) * isaacseymour$deprecated_time$Time$Internal$secondMs)) + A3(elm$core$Basics$clamp, 0, 999, millisecond);
};
var isaacseymour$deprecated_time$Time$DateTime$dateTime = function (data) {
	return isaacseymour$deprecated_time$Time$DateTime$DateTime(
		{
			date: A3(isaacseymour$deprecated_time$Time$Date$date, data.year, data.month, data.day),
			offset: isaacseymour$deprecated_time$Time$Internal$offsetFromTimeData(data)
		});
};
var isaacseymour$deprecated_time$Time$Internal$zero = {day: 1, hour: 0, millisecond: 0, minute: 0, month: 1, second: 0, year: 0};
var isaacseymour$deprecated_time$Time$DateTime$zero = isaacseymour$deprecated_time$Time$Internal$zero;
var isaacseymour$deprecated_time$Time$DateTime$epoch = isaacseymour$deprecated_time$Time$DateTime$dateTime(
	_Utils_update(
		isaacseymour$deprecated_time$Time$DateTime$zero,
		{year: 1970}));
var isaacseymour$deprecated_time$Time$DateTime$fromPosix = function (posix) {
	return A2(
		isaacseymour$deprecated_time$Time$DateTime$addMilliseconds,
		elm$time$Time$posixToMillis(posix),
		isaacseymour$deprecated_time$Time$DateTime$epoch);
};
var isaacseymour$deprecated_time$Time$Date$delta = F2(
	function (_n0, _n1) {
		var d1 = _n0.a;
		var d2 = _n1.a;
		return {
			days: A3(isaacseymour$deprecated_time$Time$Date$daysFromYearMonthDay, d1.year, d1.month, d1.day) - A3(isaacseymour$deprecated_time$Time$Date$daysFromYearMonthDay, d2.year, d2.month, d2.day),
			months: ((elm$core$Basics$abs(d1.year) * 12) + isaacseymour$deprecated_time$Time$Date$monthToInt(d1.month)) - ((elm$core$Basics$abs(d2.year) * 12) + isaacseymour$deprecated_time$Time$Date$monthToInt(d2.month)),
			years: d1.year - d2.year
		};
	});
var isaacseymour$deprecated_time$Time$DateTime$delta = F2(
	function (_n0, _n1) {
		var t1 = _n0.a;
		var t2 = _n1.a;
		var _n2 = A2(isaacseymour$deprecated_time$Time$Date$delta, t1.date, t2.date);
		var years = _n2.years;
		var months = _n2.months;
		var days = _n2.days;
		var milliseconds = (days * isaacseymour$deprecated_time$Time$Internal$dayMs) + (t1.offset - t2.offset);
		var hours = (milliseconds / isaacseymour$deprecated_time$Time$Internal$hourMs) | 0;
		var minutes = (milliseconds / isaacseymour$deprecated_time$Time$Internal$minuteMs) | 0;
		var seconds = (milliseconds / isaacseymour$deprecated_time$Time$Internal$secondMs) | 0;
		return {days: days, hours: hours, milliseconds: milliseconds, minutes: minutes, months: months, seconds: seconds, years: years};
	});
var isaacseymour$deprecated_time$Time$DateTime$toPosix = function (time) {
	return elm$time$Time$millisToPosix(
		A2(isaacseymour$deprecated_time$Time$DateTime$delta, time, isaacseymour$deprecated_time$Time$DateTime$epoch).milliseconds);
};
var author$project$Time$Bdt$addMonths = F2(
	function (number, posix) {
		return isaacseymour$deprecated_time$Time$DateTime$toPosix(
			A2(
				isaacseymour$deprecated_time$Time$DateTime$addMonths,
				number,
				isaacseymour$deprecated_time$Time$DateTime$fromPosix(posix)));
	});
var author$project$Time$Bdt$clamp = F3(
	function (minPosix, maxPosix, posix) {
		return (_Utils_cmp(
			elm$time$Time$posixToMillis(posix),
			elm$time$Time$posixToMillis(minPosix)) < 0) ? minPosix : ((_Utils_cmp(
			elm$time$Time$posixToMillis(posix),
			elm$time$Time$posixToMillis(maxPosix)) > 0) ? maxPosix : posix);
	});
var author$project$Time$Bdt$maybeClamp = F3(
	function (mMinPosix, mMaxPosix, posix) {
		var _n0 = _Utils_Tuple2(mMinPosix, mMaxPosix);
		if (_n0.a.$ === 'Just') {
			if (_n0.b.$ === 'Just') {
				var minPosix = _n0.a.a;
				var maxPosix = _n0.b.a;
				return A3(author$project$Time$Bdt$clamp, minPosix, maxPosix, posix);
			} else {
				var minPosix = _n0.a.a;
				return A3(author$project$Time$Bdt$clamp, minPosix, posix, posix);
			}
		} else {
			if (_n0.b.$ === 'Just') {
				var maxPosix = _n0.b.a;
				return A3(author$project$Time$Bdt$clamp, posix, maxPosix, posix);
			} else {
				return posix;
			}
		}
	});
var author$project$Time$Bdt$monthNumber = function (month) {
	switch (month.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return elm$core$Basics$floor(numerator / denominator);
	});
var elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var elm$time$Time$toAdjustedMinutes = F2(
	function (_n0, time) {
		var defaultOffset = _n0.a;
		var eras = _n0.b;
		return A3(
			elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2(elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var elm$time$Time$toDay = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			elm$core$Basics$modBy,
			24,
			A2(
				elm$time$Time$flooredDiv,
				A2(elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			elm$core$Basics$modBy,
			60,
			A2(elm$time$Time$toAdjustedMinutes, zone, time));
	});
var elm$time$Time$Apr = {$: 'Apr'};
var elm$time$Time$Aug = {$: 'Aug'};
var elm$time$Time$Dec = {$: 'Dec'};
var elm$time$Time$Feb = {$: 'Feb'};
var elm$time$Time$Jan = {$: 'Jan'};
var elm$time$Time$Jul = {$: 'Jul'};
var elm$time$Time$Jun = {$: 'Jun'};
var elm$time$Time$Mar = {$: 'Mar'};
var elm$time$Time$May = {$: 'May'};
var elm$time$Time$Nov = {$: 'Nov'};
var elm$time$Time$Oct = {$: 'Oct'};
var elm$time$Time$Sep = {$: 'Sep'};
var elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _n0 = elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_n0) {
			case 1:
				return elm$time$Time$Jan;
			case 2:
				return elm$time$Time$Feb;
			case 3:
				return elm$time$Time$Mar;
			case 4:
				return elm$time$Time$Apr;
			case 5:
				return elm$time$Time$May;
			case 6:
				return elm$time$Time$Jun;
			case 7:
				return elm$time$Time$Jul;
			case 8:
				return elm$time$Time$Aug;
			case 9:
				return elm$time$Time$Sep;
			case 10:
				return elm$time$Time$Oct;
			case 11:
				return elm$time$Time$Nov;
			default:
				return elm$time$Time$Dec;
		}
	});
var elm$time$Time$toSecond = F2(
	function (_n0, time) {
		return A2(
			elm$core$Basics$modBy,
			60,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				1000));
	});
var elm$time$Time$toYear = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var isaacseymour$deprecated_time$Time$Date$setDay = F2(
	function (newDay, _n0) {
		var d = _n0.a;
		return A3(
			isaacseymour$deprecated_time$Time$Date$firstValid,
			d.year,
			d.month,
			isaacseymour$deprecated_time$Time$Date$clampDay(newDay));
	});
var isaacseymour$deprecated_time$Time$DateTime$setDay = F2(
	function (newDay, _n0) {
		var data = _n0.a;
		return isaacseymour$deprecated_time$Time$DateTime$DateTime(
			{
				date: A2(isaacseymour$deprecated_time$Time$Date$setDay, newDay, data.date),
				offset: data.offset
			});
	});
var isaacseymour$deprecated_time$Time$DateTime$millisecond = function (_n0) {
	var offset = _n0.a.offset;
	return A2(
		elm$core$Basics$modBy,
		isaacseymour$deprecated_time$Time$Internal$secondMs,
		A2(
			elm$core$Basics$modBy,
			isaacseymour$deprecated_time$Time$Internal$minuteMs,
			A2(elm$core$Basics$modBy, isaacseymour$deprecated_time$Time$Internal$hourMs, offset)));
};
var isaacseymour$deprecated_time$Time$DateTime$minute = function (_n0) {
	var offset = _n0.a.offset;
	return (A2(elm$core$Basics$modBy, isaacseymour$deprecated_time$Time$Internal$hourMs, offset) / isaacseymour$deprecated_time$Time$Internal$minuteMs) | 0;
};
var isaacseymour$deprecated_time$Time$DateTime$mkDateTime = F2(
	function (date_, time) {
		return isaacseymour$deprecated_time$Time$DateTime$DateTime(
			{
				date: date_,
				offset: isaacseymour$deprecated_time$Time$Internal$offsetFromTimeData(time)
			});
	});
var isaacseymour$deprecated_time$Time$DateTime$second = function (_n0) {
	var offset = _n0.a.offset;
	return (A2(
		elm$core$Basics$modBy,
		isaacseymour$deprecated_time$Time$Internal$minuteMs,
		A2(elm$core$Basics$modBy, isaacseymour$deprecated_time$Time$Internal$hourMs, offset)) / isaacseymour$deprecated_time$Time$Internal$secondMs) | 0;
};
var isaacseymour$deprecated_time$Time$DateTime$setHour = F2(
	function (newHour, t) {
		var data = t.a;
		return A2(
			isaacseymour$deprecated_time$Time$DateTime$mkDateTime,
			data.date,
			{
				hour: newHour,
				millisecond: isaacseymour$deprecated_time$Time$DateTime$millisecond(t),
				minute: isaacseymour$deprecated_time$Time$DateTime$minute(t),
				second: isaacseymour$deprecated_time$Time$DateTime$second(t)
			});
	});
var isaacseymour$deprecated_time$Time$DateTime$hour = function (_n0) {
	var offset = _n0.a.offset;
	return (offset / isaacseymour$deprecated_time$Time$Internal$hourMs) | 0;
};
var isaacseymour$deprecated_time$Time$DateTime$setMinute = F2(
	function (newMinute, t) {
		var data = t.a;
		return A2(
			isaacseymour$deprecated_time$Time$DateTime$mkDateTime,
			data.date,
			{
				hour: isaacseymour$deprecated_time$Time$DateTime$hour(t),
				millisecond: isaacseymour$deprecated_time$Time$DateTime$millisecond(t),
				minute: newMinute,
				second: isaacseymour$deprecated_time$Time$DateTime$second(t)
			});
	});
var isaacseymour$deprecated_time$Time$Date$setMonth = F2(
	function (newMonth, _n0) {
		var d = _n0.a;
		return A3(
			isaacseymour$deprecated_time$Time$Date$firstValid,
			d.year,
			isaacseymour$deprecated_time$Time$Date$clampMonth(newMonth),
			d.day);
	});
var isaacseymour$deprecated_time$Time$DateTime$setMonth = F2(
	function (newMonth, _n0) {
		var data = _n0.a;
		return isaacseymour$deprecated_time$Time$DateTime$DateTime(
			{
				date: A2(isaacseymour$deprecated_time$Time$Date$setMonth, newMonth, data.date),
				offset: data.offset
			});
	});
var isaacseymour$deprecated_time$Time$DateTime$setSecond = F2(
	function (newSecond, t) {
		var data = t.a;
		return A2(
			isaacseymour$deprecated_time$Time$DateTime$mkDateTime,
			data.date,
			{
				hour: isaacseymour$deprecated_time$Time$DateTime$hour(t),
				millisecond: isaacseymour$deprecated_time$Time$DateTime$millisecond(t),
				minute: isaacseymour$deprecated_time$Time$DateTime$minute(t),
				second: newSecond
			});
	});
var isaacseymour$deprecated_time$Time$Date$setYear = F2(
	function (newYear, _n0) {
		var d = _n0.a;
		return A3(isaacseymour$deprecated_time$Time$Date$firstValid, newYear, d.month, d.day);
	});
var isaacseymour$deprecated_time$Time$DateTime$setYear = F2(
	function (newYear, _n0) {
		var data = _n0.a;
		return isaacseymour$deprecated_time$Time$DateTime$DateTime(
			{
				date: A2(isaacseymour$deprecated_time$Time$Date$setYear, newYear, data.date),
				offset: data.offset
			});
	});
var author$project$Form$DatePicker$Internal$update = F2(
	function (msg, state) {
		switch (msg.$) {
			case 'Open':
				var minPosix = msg.a;
				var maxPosix = msg.b;
				var includeTime = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							desiredPosix: author$project$Resettable$getValue(state.selectedPosix),
							focusedSelect: elm$core$Maybe$Nothing,
							hours: function (option) {
								return A2(
									author$project$Form$Select$setInitialOption,
									elm$core$Maybe$Just(
										A2(elm$core$Maybe$withDefault, 0, option)),
									state.hours);
							}(
								A2(
									elm$core$Maybe$map,
									elm$time$Time$toHour(state.timeZone),
									author$project$Resettable$getValue(state.selectedPosix))),
							isOpen: true,
							minutes: function (option) {
								return A2(
									author$project$Form$Select$setInitialOption,
									elm$core$Maybe$Just(
										A2(elm$core$Maybe$withDefault, 0, option)),
									state.minutes);
							}(
								A2(
									elm$core$Maybe$map,
									elm$time$Time$toMinute(state.timeZone),
									author$project$Resettable$getValue(state.selectedPosix))),
							navigationPosix: author$project$Resettable$getValue(state.selectedPosix),
							seconds: function (option) {
								return A2(
									author$project$Form$Select$setInitialOption,
									elm$core$Maybe$Just(
										A2(elm$core$Maybe$withDefault, 0, option)),
									state.seconds);
							}(
								A2(
									elm$core$Maybe$map,
									elm$time$Time$toSecond(state.timeZone),
									author$project$Resettable$getValue(state.selectedPosix)))
						}),
					A4(
						author$project$Form$DatePicker$Internal$openCmd,
						author$project$Resettable$getValue(state.selectedPosix),
						minPosix,
						maxPosix,
						includeTime));
			case 'Blur':
				var _n1 = _Utils_eq(state.focusedSelect, elm$core$Maybe$Nothing);
				if (_n1) {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{isOpen: false}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
				}
			case 'InitWithCurrentDate':
				var minPosix = msg.a;
				var maxPosix = msg.b;
				var posix = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							navigationPosix: elm$core$Maybe$Just(
								A3(author$project$Time$Bdt$maybeClamp, minPosix, maxPosix, posix))
						}),
					elm$core$Platform$Cmd$none);
			case 'PreviousYear':
				var minPosix = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							navigationPosix: A2(
								elm$core$Maybe$map,
								A2(
									elm$core$Basics$composeR,
									author$project$Time$Bdt$addMonths(-12),
									A2(author$project$Time$Bdt$maybeClamp, minPosix, state.navigationPosix)),
								state.navigationPosix)
						}),
					elm$core$Platform$Cmd$none);
			case 'PreviousMonth':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							navigationPosix: A2(
								elm$core$Maybe$map,
								author$project$Time$Bdt$addMonths(-1),
								state.navigationPosix)
						}),
					elm$core$Platform$Cmd$none);
			case 'NextYear':
				var maxPosix = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							navigationPosix: A2(
								elm$core$Maybe$map,
								A2(
									elm$core$Basics$composeR,
									author$project$Time$Bdt$addMonths(12),
									A2(author$project$Time$Bdt$maybeClamp, state.navigationPosix, maxPosix)),
								state.navigationPosix)
						}),
					elm$core$Platform$Cmd$none);
			case 'NextMonth':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							navigationPosix: A2(
								elm$core$Maybe$map,
								author$project$Time$Bdt$addMonths(1),
								state.navigationPosix)
						}),
					elm$core$Platform$Cmd$none);
			case 'SelectDay':
				var posix = msg.a;
				var includeTime = msg.b;
				if (!includeTime) {
					var newPosix = function () {
						var _n3 = author$project$Resettable$getValue(state.selectedPosix);
						if (_n3.$ === 'Nothing') {
							return posix;
						} else {
							var currentPosix = _n3.a;
							return isaacseymour$deprecated_time$Time$DateTime$toPosix(
								A2(
									isaacseymour$deprecated_time$Time$DateTime$setSecond,
									0,
									A2(
										isaacseymour$deprecated_time$Time$DateTime$setMinute,
										0,
										A2(
											isaacseymour$deprecated_time$Time$DateTime$setHour,
											0,
											A2(
												isaacseymour$deprecated_time$Time$DateTime$setDay,
												A2(elm$time$Time$toDay, state.timeZone, posix),
												A2(
													isaacseymour$deprecated_time$Time$DateTime$setMonth,
													author$project$Time$Bdt$monthNumber(
														A2(elm$time$Time$toMonth, state.timeZone, posix)),
													A2(
														isaacseymour$deprecated_time$Time$DateTime$setYear,
														A2(elm$time$Time$toYear, state.timeZone, posix),
														isaacseymour$deprecated_time$Time$DateTime$fromPosix(currentPosix))))))));
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{
								isOpen: false,
								selectedPosix: A2(
									author$project$Resettable$update,
									elm$core$Maybe$Just(newPosix),
									state.selectedPosix)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{
								desiredPosix: elm$core$Maybe$Just(posix)
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'Apply':
				var _n4 = state.desiredPosix;
				if (_n4.$ === 'Nothing') {
					return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
				} else {
					var desiredPosix = _n4.a;
					var newPosix = isaacseymour$deprecated_time$Time$DateTime$toPosix(
						A2(
							isaacseymour$deprecated_time$Time$DateTime$setSecond,
							A2(
								elm$core$Maybe$withDefault,
								0,
								author$project$Form$Select$getSelectedOption(state.seconds)),
							A2(
								isaacseymour$deprecated_time$Time$DateTime$setMinute,
								A2(
									elm$core$Maybe$withDefault,
									0,
									author$project$Form$Select$getSelectedOption(state.minutes)),
								A2(
									isaacseymour$deprecated_time$Time$DateTime$setHour,
									A2(
										elm$core$Maybe$withDefault,
										0,
										author$project$Form$Select$getSelectedOption(state.hours)),
									A2(
										isaacseymour$deprecated_time$Time$DateTime$setDay,
										A2(elm$time$Time$toDay, state.timeZone, desiredPosix),
										A2(
											isaacseymour$deprecated_time$Time$DateTime$setMonth,
											author$project$Time$Bdt$monthNumber(
												A2(elm$time$Time$toMonth, state.timeZone, desiredPosix)),
											A2(
												isaacseymour$deprecated_time$Time$DateTime$setYear,
												A2(elm$time$Time$toYear, state.timeZone, desiredPosix),
												isaacseymour$deprecated_time$Time$DateTime$epoch)))))));
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{
								isOpen: false,
								selectedPosix: A2(
									author$project$Resettable$update,
									elm$core$Maybe$Just(newPosix),
									state.selectedPosix)
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'Clear':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							isOpen: false,
							selectedPosix: A2(author$project$Resettable$update, elm$core$Maybe$Nothing, state.selectedPosix)
						}),
					elm$core$Platform$Cmd$none);
			case 'OpenTimeSelect':
				var select = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							focusedSelect: elm$core$Maybe$Just(select)
						}),
					author$project$Form$DatePicker$Internal$openTimeSelect(select));
			case 'UpdateHours':
				var selectMsg = msg.a;
				var _n5 = A2(author$project$Form$Select$update, selectMsg, state.hours);
				var newSelect = _n5.a;
				var cmd = _n5.b;
				var focusedSelect = ((!author$project$Form$Select$getIsOpen(newSelect)) && _Utils_eq(
					state.focusedSelect,
					elm$core$Maybe$Just(author$project$Form$DatePicker$Internal$Hours))) ? elm$core$Maybe$Nothing : state.focusedSelect;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{focusedSelect: focusedSelect, hours: newSelect}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(elm$core$Platform$Cmd$map, author$project$Form$DatePicker$Internal$UpdateHours, cmd),
								(!_Utils_eq(focusedSelect, elm$core$Maybe$Nothing)) ? elm$core$Platform$Cmd$none : A2(
								elm$core$Task$attempt,
								author$project$Form$DatePicker$Internal$DomFocus,
								elm$browser$Browser$Dom$focus('FORM_DATEPICKER'))
							])));
			case 'UpdateMinutes':
				var selectMsg = msg.a;
				var _n6 = A2(author$project$Form$Select$update, selectMsg, state.minutes);
				var newSelect = _n6.a;
				var cmd = _n6.b;
				var focusedSelect = ((!author$project$Form$Select$getIsOpen(newSelect)) && _Utils_eq(
					state.focusedSelect,
					elm$core$Maybe$Just(author$project$Form$DatePicker$Internal$Minutes))) ? elm$core$Maybe$Nothing : state.focusedSelect;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{focusedSelect: focusedSelect, minutes: newSelect}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(elm$core$Platform$Cmd$map, author$project$Form$DatePicker$Internal$UpdateMinutes, cmd),
								(!_Utils_eq(focusedSelect, elm$core$Maybe$Nothing)) ? elm$core$Platform$Cmd$none : A2(
								elm$core$Task$attempt,
								author$project$Form$DatePicker$Internal$DomFocus,
								elm$browser$Browser$Dom$focus('FORM_DATEPICKER'))
							])));
			case 'UpdateSeconds':
				var selectMsg = msg.a;
				var _n7 = A2(author$project$Form$Select$update, selectMsg, state.seconds);
				var newSelect = _n7.a;
				var cmd = _n7.b;
				var focusedSelect = ((!author$project$Form$Select$getIsOpen(newSelect)) && _Utils_eq(
					state.focusedSelect,
					elm$core$Maybe$Just(author$project$Form$DatePicker$Internal$Seconds))) ? elm$core$Maybe$Nothing : state.focusedSelect;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{focusedSelect: focusedSelect, seconds: newSelect}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(elm$core$Platform$Cmd$map, author$project$Form$DatePicker$Internal$UpdateSeconds, cmd),
								(!_Utils_eq(focusedSelect, elm$core$Maybe$Nothing)) ? elm$core$Platform$Cmd$none : A2(
								elm$core$Task$attempt,
								author$project$Form$DatePicker$Internal$DomFocus,
								elm$browser$Browser$Dom$focus('FORM_DATEPICKER'))
							])));
			case 'DomFocus':
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Form$DatePicker$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return A2(
			elm$core$Tuple$mapFirst,
			author$project$Form$DatePicker$Model,
			A2(author$project$Form$DatePicker$Internal$update, msg, state));
	});
var elm$core$String$toFloat = _String_toFloat;
var author$project$Form$FloatInput$Internal$update = F2(
	function (_n0, state) {
		var string = _n0.a;
		var _n1 = _Utils_Tuple2(
			elm$core$String$toFloat(string),
			string === '');
		if ((_n1.a.$ === 'Nothing') && (!_n1.b)) {
			var _n2 = _n1.a;
			return _Utils_update(
				state,
				{bypassLazy: state.bypassLazy + 1});
		} else {
			return _Utils_update(
				state,
				{
					value: A2(author$project$Resettable$update, string, state.value)
				});
		}
	});
var author$project$Form$FloatInput$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return author$project$Form$FloatInput$Model(
			A2(author$project$Form$FloatInput$Internal$update, msg, state));
	});
var author$project$Form$Input$Internal$update = F2(
	function (_n0, state) {
		var string = _n0.a;
		return _Utils_update(
			state,
			{
				value: A2(author$project$Resettable$update, string, state.value)
			});
	});
var author$project$Form$Input$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return author$project$Form$Input$Model(
			A2(author$project$Form$Input$Internal$update, msg, state));
	});
var author$project$Form$IntInput$Internal$update = F2(
	function (_n0, state) {
		var string = _n0.a;
		var _n1 = _Utils_Tuple2(
			elm$core$String$toInt(string),
			string === '');
		if ((_n1.a.$ === 'Nothing') && (!_n1.b)) {
			var _n2 = _n1.a;
			return _Utils_update(
				state,
				{bypassLazy: state.bypassLazy + 1});
		} else {
			return _Utils_update(
				state,
				{
					value: A2(author$project$Resettable$update, string, state.value)
				});
		}
	});
var author$project$Form$IntInput$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return author$project$Form$IntInput$Model(
			A2(author$project$Form$IntInput$Internal$update, msg, state));
	});
var author$project$Form$Helpers$getNextOption = F2(
	function (options, mFocusedOption) {
		if (mFocusedOption.$ === 'Nothing') {
			return elm$core$List$head(options);
		} else {
			var focusedOption = mFocusedOption.a;
			return elm$core$List$head(
				A2(
					elm$core$List$drop,
					1,
					A2(
						elm_community$list_extra$List$Extra$dropWhile,
						elm$core$Basics$neq(focusedOption),
						options)));
		}
	});
var author$project$Form$Helpers$getPreviousOption = F2(
	function (options, focusedOption) {
		return A2(
			author$project$Form$Helpers$getNextOption,
			elm$core$List$reverse(options),
			focusedOption);
	});
var author$project$Form$MultiSelect$Internal$toggleOption = F2(
	function (option, selectedOptions) {
		var options = author$project$Resettable$getValue(selectedOptions);
		var newOptions = function () {
			var _n0 = A2(elm$core$List$member, option, options);
			if (_n0) {
				return A2(
					elm$core$List$filter,
					elm$core$Basics$neq(option),
					options);
			} else {
				return A2(elm$core$List$cons, option, options);
			}
		}();
		return A2(author$project$Resettable$update, newOptions, selectedOptions);
	});
var author$project$Form$MultiSelect$Internal$update = F2(
	function (msg, state) {
		switch (msg.$) {
			case 'Open':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{isOpen: true}),
					elm$core$Platform$Cmd$none);
			case 'Blur':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{isOpen: false}),
					elm$core$Platform$Cmd$none);
			case 'Select':
				var option = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							selectedOptions: A2(author$project$Form$MultiSelect$Internal$toggleOption, option, state.selectedOptions)
						}),
					elm$core$Platform$Cmd$none);
			case 'Clear':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							selectedOptions: A2(author$project$Resettable$update, _List_Nil, state.selectedOptions)
						}),
					elm$core$Platform$Cmd$none);
			case 'SelectKey':
				switch (msg.b.$) {
					case 'Up':
						var _n1 = msg.b;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									focusedOption: A2(
										author$project$Form$Helpers$getPreviousOption,
										mgold$elm_nonempty_list$List$Nonempty$toList(state.options),
										state.focusedOption)
								}),
							elm$core$Platform$Cmd$none);
					case 'Down':
						var _n2 = msg.b;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									focusedOption: A2(
										author$project$Form$Helpers$getNextOption,
										mgold$elm_nonempty_list$List$Nonempty$toList(state.options),
										state.focusedOption)
								}),
							elm$core$Platform$Cmd$none);
					case 'Backspace':
						var _n3 = msg.b;
						return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
					case 'AlphaNum':
						return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
					default:
						var isOptionDisabled = msg.a;
						var _n4 = state.focusedOption;
						if (_n4.$ === 'Nothing') {
							return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
						} else {
							var focusedOption = _n4.a;
							var _n5 = isOptionDisabled(focusedOption);
							if (_n5) {
								return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										state,
										{
											selectedOptions: A2(author$project$Form$MultiSelect$Internal$toggleOption, focusedOption, state.selectedOptions)
										}),
									elm$core$Platform$Cmd$none);
							}
						}
				}
			default:
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Form$MultiSelect$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return A2(
			elm$core$Tuple$mapFirst,
			author$project$Form$MultiSelect$Model,
			A2(author$project$Form$MultiSelect$Internal$update, msg, state));
	});
var author$project$Form$SearchSelect$Internal$Response = function (a) {
	return {$: 'Response', a: a};
};
var author$project$Form$SearchSelect$Internal$searchResponseDecoder = function (optionDecoder) {
	return elm$json$Json$Decode$list(optionDecoder);
};
var elm$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var elm$http$Http$emptyBody = elm$http$Http$Internal$EmptyBody;
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm$http$Http$expectJson = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.body);
			if (_n0.$ === 'Err') {
				var decodeError = _n0.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm$core$Result$Ok(value);
			}
		});
};
var elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$http$Http$request = elm$http$Http$Internal$Request;
var elm$http$Http$get = F2(
	function (url, decoder) {
		return elm$http$Http$request(
			{
				body: elm$http$Http$emptyBody,
				expect: elm$http$Http$expectJson(decoder),
				headers: _List_Nil,
				method: 'GET',
				timeout: elm$core$Maybe$Nothing,
				url: url,
				withCredentials: false
			});
	});
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0.a;
	return A2(_Http_toTask, request_, elm$core$Maybe$Nothing);
};
var elm$http$Http$send = F2(
	function (resultToMessage, request_) {
		return A2(
			elm$core$Task$attempt,
			resultToMessage,
			elm$http$Http$toTask(request_));
	});
var author$project$Form$SearchSelect$Internal$searchRequest = F3(
	function (searchUrl, input, optionDecoder) {
		return A2(
			elm$http$Http$send,
			author$project$Form$SearchSelect$Internal$Response,
			A2(
				elm$http$Http$get,
				_Utils_ap(searchUrl, input),
				author$project$Form$SearchSelect$Internal$searchResponseDecoder(optionDecoder)));
	});
var author$project$Form$SearchSelect$Internal$shouldSearch = F2(
	function (inputMinimum, input) {
		return _Utils_cmp(
			elm$core$String$length(input),
			inputMinimum) > -1;
	});
var author$project$Form$SearchSelect$Internal$update = F2(
	function (msg, state) {
		switch (msg.$) {
			case 'Open':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{isOpen: true}),
					elm$core$Platform$Cmd$none);
			case 'Blur':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{focusedOption: elm$core$Maybe$Nothing, input: '', isOpen: false}),
					elm$core$Platform$Cmd$none);
			case 'UpdateSearchInput':
				var inputMinimum = msg.a;
				var value = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							input: value,
							isSearching: A2(author$project$Form$SearchSelect$Internal$shouldSearch, inputMinimum, value)
						}),
					A2(author$project$Form$SearchSelect$Internal$shouldSearch, inputMinimum, value) ? A3(author$project$Form$SearchSelect$Internal$searchRequest, state.searchUrl, value, state.optionDecoder) : elm$core$Platform$Cmd$none);
			case 'Response':
				var result = msg.a;
				if (result.$ === 'Err') {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{isSearching: false}),
						elm$core$Platform$Cmd$none);
				} else {
					var options = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{focusedOption: elm$core$Maybe$Nothing, isSearching: false, options: options}),
						elm$core$Platform$Cmd$none);
				}
			case 'Clear':
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							selectedOption: A2(author$project$Resettable$update, elm$core$Maybe$Nothing, state.selectedOption)
						}),
					elm$core$Platform$Cmd$none);
			case 'Select':
				var selectedOption = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							input: '',
							selectedOption: A2(
								author$project$Resettable$update,
								elm$core$Maybe$Just(selectedOption),
								state.selectedOption)
						}),
					elm$core$Platform$Cmd$none);
			default:
				switch (msg.a.$) {
					case 'Up':
						var _n2 = msg.a;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									focusedOption: A2(author$project$Form$Helpers$getPreviousOption, state.options, state.focusedOption)
								}),
							elm$core$Platform$Cmd$none);
					case 'Down':
						var _n3 = msg.a;
						return _Utils_Tuple2(
							_Utils_update(
								state,
								{
									focusedOption: A2(author$project$Form$Helpers$getNextOption, state.options, state.focusedOption)
								}),
							elm$core$Platform$Cmd$none);
					case 'Backspace':
						var _n4 = msg.a;
						return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
					case 'AlphaNum':
						return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
					default:
						var _n5 = state.focusedOption;
						if (_n5.$ === 'Nothing') {
							return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
						} else {
							var focusedOption = _n5.a;
							return _Utils_Tuple2(
								_Utils_update(
									state,
									{
										input: '',
										isOpen: false,
										selectedOption: A2(
											author$project$Resettable$update,
											elm$core$Maybe$Just(focusedOption),
											state.selectedOption)
									}),
								elm$core$Platform$Cmd$none);
						}
				}
		}
	});
var author$project$Form$SearchSelect$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return A2(
			elm$core$Tuple$mapFirst,
			author$project$Form$SearchSelect$Model,
			A2(author$project$Form$SearchSelect$Internal$update, msg, state));
	});
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var author$project$Form$TextArea$Internal$replace = F2(
	function (_n0, acc) {
		var search = _n0.a;
		var replacement = _n0.b;
		return A3(elm$core$String$replace, search, replacement, acc);
	});
var author$project$Form$TextArea$Internal$update = F2(
	function (msg, state) {
		var string = msg.a;
		return _Utils_update(
			state,
			{
				value: A2(
					author$project$Resettable$update,
					A3(elm$core$List$foldl, author$project$Form$TextArea$Internal$replace, string, state.replacements),
					state.value)
			});
	});
var author$project$Form$TextArea$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		return author$project$Form$TextArea$Model(
			A2(author$project$Form$TextArea$Internal$update, msg, state));
	});
var author$project$Index$Msg$DatePicker2Msg = function (a) {
	return {$: 'DatePicker2Msg', a: a};
};
var author$project$Index$Msg$DatePicker3Msg = function (a) {
	return {$: 'DatePicker3Msg', a: a};
};
var author$project$Index$Msg$DatePickerMsg = function (a) {
	return {$: 'DatePickerMsg', a: a};
};
var author$project$Index$Msg$MultiSelectMsg = function (a) {
	return {$: 'MultiSelectMsg', a: a};
};
var author$project$Index$Msg$SearchSelectMsg = function (a) {
	return {$: 'SearchSelectMsg', a: a};
};
var author$project$Index$Msg$SelectMsg = function (a) {
	return {$: 'SelectMsg', a: a};
};
var author$project$Index$Msg$UpdateCountryOfBirth = function (a) {
	return {$: 'UpdateCountryOfBirth', a: a};
};
var author$project$Index$Msg$UpdateStartDate = function (a) {
	return {$: 'UpdateStartDate', a: a};
};
var author$project$ToolTip$update = F2(
	function (msg, _n0) {
		var state = _n0.a;
		if (msg.$ === 'MouseEnter') {
			return author$project$ToolTip$Model(
				_Utils_update(
					state,
					{isOpen: true}));
		} else {
			return author$project$ToolTip$Model(
				_Utils_update(
					state,
					{isOpen: false}));
		}
	});
var author$project$Index$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'AddGreenToaster':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'AddRedToaster':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'InputMsg':
				var inputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							input: A2(author$project$Form$Input$update, inputMsg, model.input)
						}),
					elm$core$Platform$Cmd$none);
			case 'IntInputMsg':
				var intInputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							intInput: A2(author$project$Form$IntInput$update, intInputMsg, model.intInput)
						}),
					elm$core$Platform$Cmd$none);
			case 'FloatInputMsg':
				var floatInputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							floatInput: A2(author$project$Form$FloatInput$update, floatInputMsg, model.floatInput)
						}),
					elm$core$Platform$Cmd$none);
			case 'SelectMsg':
				var selectMsg = msg.a;
				var _n1 = A2(author$project$Form$Select$update, selectMsg, model.select);
				var newSelect = _n1.a;
				var cmd = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{select: newSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$SelectMsg, cmd));
			case 'MultiSelectMsg':
				var multiSelectMsg = msg.a;
				var _n2 = A2(author$project$Form$MultiSelect$update, multiSelectMsg, model.multiSelect);
				var newMultiSelect = _n2.a;
				var cmd = _n2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{multiSelect: newMultiSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$MultiSelectMsg, cmd));
			case 'SearchSelectMsg':
				var searchSelectMsg = msg.a;
				var _n3 = A2(author$project$Form$SearchSelect$update, searchSelectMsg, model.searchSelect);
				var newSearchSelect = _n3.a;
				var cmd = _n3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{searchSelect: newSearchSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$SearchSelectMsg, cmd));
			case 'DatePickerMsg':
				var datePickerMsg = msg.a;
				var _n4 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.datePicker);
				var newDatePicker = _n4.a;
				var cmd = _n4.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{datePicker: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$DatePickerMsg, cmd));
			case 'DatePicker2Msg':
				var datePickerMsg = msg.a;
				var _n5 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.datePicker2);
				var newDatePicker = _n5.a;
				var cmd = _n5.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{datePicker2: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$DatePicker2Msg, cmd));
			case 'DatePicker3Msg':
				var datePickerMsg = msg.a;
				var _n6 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.datePicker3);
				var newDatePicker = _n6.a;
				var cmd = _n6.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{datePicker3: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$DatePicker3Msg, cmd));
			case 'TextAreaMsg':
				var textAreaMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							textArea: A2(author$project$Form$TextArea$update, textAreaMsg, model.textArea)
						}),
					elm$core$Platform$Cmd$none);
			case 'TextAreaWrapMsg':
				var textAreaWrapMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							textAreaWrap: A2(author$project$Form$TextArea$update, textAreaWrapMsg, model.textAreaWrap)
						}),
					elm$core$Platform$Cmd$none);
			case 'Toggle1':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{toggle1: !model.toggle1}),
					elm$core$Platform$Cmd$none);
			case 'Toggle2':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{toggle2: !model.toggle2}),
					elm$core$Platform$Cmd$none);
			case 'DisabledToggle':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{toggle3: !model.toggle3}),
					elm$core$Platform$Cmd$none);
			case 'ToolTip1Msg':
				var toolTipMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							toolTip1: A2(author$project$ToolTip$update, toolTipMsg, model.toolTip1)
						}),
					elm$core$Platform$Cmd$none);
			case 'ToolTip2Msg':
				var toolTipMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							toolTip2: A2(author$project$ToolTip$update, toolTipMsg, model.toolTip2)
						}),
					elm$core$Platform$Cmd$none);
			case 'ToolTip3Msg':
				var toolTipMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							toolTip3: A2(author$project$ToolTip$update, toolTipMsg, model.toolTip3)
						}),
					elm$core$Platform$Cmd$none);
			case 'ToolTip4Msg':
				var toolTipMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							toolTip4: A2(author$project$ToolTip$update, toolTipMsg, model.toolTip4)
						}),
					elm$core$Platform$Cmd$none);
			case 'UpdateName':
				var inputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							name: A2(author$project$Form$Input$update, inputMsg, model.name)
						}),
					elm$core$Platform$Cmd$none);
			case 'UpdateStartDate':
				var datePickerMsg = msg.a;
				var _n7 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.startDate);
				var newDatePicker = _n7.a;
				var cmd = _n7.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{startDate: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$UpdateStartDate, cmd));
			case 'UpdateEmail':
				var inputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							email: A2(author$project$Form$Input$update, inputMsg, model.email)
						}),
					elm$core$Platform$Cmd$none);
			case 'UpdatePreferredGenre':
				var selectMsg = msg.a;
				var _n8 = A2(author$project$Form$Select$update, selectMsg, model.preferredGenre);
				var newSelect = _n8.a;
				var cmd = _n8.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{preferredGenre: newSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$SelectMsg, cmd));
			case 'UpdateCountryOfBirth':
				var searchSelectMsg = msg.a;
				var _n9 = A2(author$project$Form$SearchSelect$update, searchSelectMsg, model.countryOfBirth);
				var newSearchSelect = _n9.a;
				var cmd = _n9.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{countryOfBirth: newSearchSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$UpdateCountryOfBirth, cmd));
			case 'ToggleSmModal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{modalSmOpen: !model.modalSmOpen}),
					elm$core$Platform$Cmd$none);
			case 'ToggleLgModal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{modalLgOpen: !model.modalLgOpen}),
					elm$core$Platform$Cmd$none);
			case 'ToggleResizeModal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{modalResizeOpen: !model.modalResizeOpen}),
					elm$core$Platform$Cmd$none);
			case 'UpdateMaybeBLockSelect':
				var selectMsg = msg.a;
				var _n10 = A2(author$project$Form$Select$update, selectMsg, model.maybeBlockSelect);
				var newSelect = _n10.a;
				var cmd = _n10.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{maybeBlockSelect: newSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Index$Msg$SelectMsg, cmd));
			default:
				var isGreen = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{isGridButtonGreen: isGreen}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Msg$IndexMsg = function (a) {
	return {$: 'IndexMsg', a: a};
};
var author$project$Page$Admin = function (a) {
	return {$: 'Admin', a: a};
};
var author$project$Page$NotFound = {$: 'NotFound'};
var author$project$Page$Test = {$: 'Test'};
var author$project$Admin$Route$Courses = {$: 'Courses'};
var author$project$Admin$Route$Units = {$: 'Units'};
var elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.visited;
		var unvisited = _n0.unvisited;
		var params = _n0.params;
		var frag = _n0.frag;
		var value = _n0.value;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0.a;
		return elm$url$Url$Parser$Parser(
			function (_n1) {
				var visited = _n1.visited;
				var unvisited = _n1.unvisited;
				var params = _n1.params;
				var frag = _n1.frag;
				var value = _n1.value;
				return A2(
					elm$core$List$map,
					elm$url$Url$Parser$mapState(value),
					parseArg(
						A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				elm$core$List$concatMap,
				function (_n0) {
					var parser = _n0.a;
					return parser(state);
				},
				parsers);
		});
};
var elm$url$Url$Parser$s = function (str) {
	return elm$url$Url$Parser$Parser(
		function (_n0) {
			var visited = _n0.visited;
			var unvisited = _n0.unvisited;
			var params = _n0.params;
			var frag = _n0.frag;
			var value = _n0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						elm$url$Url$Parser$State,
						A2(elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var author$project$Admin$Route$routeParser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$url$Url$Parser$map,
			author$project$Admin$Route$Courses,
			elm$url$Url$Parser$s('courses')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Admin$Route$Units,
			elm$url$Url$Parser$s('units'))
		]));
var author$project$Route$Admin = function (a) {
	return {$: 'Admin', a: a};
};
var author$project$Route$Index = {$: 'Index'};
var author$project$Route$Test = {$: 'Test'};
var author$project$Route$Trainer = function (a) {
	return {$: 'Trainer', a: a};
};
var author$project$Trainer$Route$Settings = {$: 'Settings'};
var author$project$Trainer$Route$TrainingPlan = {$: 'TrainingPlan'};
var author$project$Trainer$Route$routeParser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$url$Url$Parser$map,
			author$project$Trainer$Route$TrainingPlan,
			elm$url$Url$Parser$s('training-plan')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Trainer$Route$Settings,
			elm$url$Url$Parser$s('settings'))
		]));
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0.a;
		var parseAfter = _n1.a;
		return elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var elm$url$Url$Parser$top = elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var author$project$Route$routeParser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(elm$url$Url$Parser$map, author$project$Route$Index, elm$url$Url$Parser$top),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$Admin,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('admin'),
				author$project$Admin$Route$routeParser)),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$Trainer,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('trainer'),
				author$project$Trainer$Route$routeParser)),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$Test,
			elm$url$Url$Parser$s('test'))
		]));
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.unvisited;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.value);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0.a;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.path),
					elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					elm$core$Basics$identity)));
	});
var author$project$Route$fromUrl = elm$url$Url$Parser$parse(author$project$Route$routeParser);
var author$project$Toasters$Internal$tick = F2(
	function (toaster, toasters) {
		var _n0 = toaster.ticks > 100;
		if (_n0) {
			return toasters;
		} else {
			return A2(
				elm$core$List$append,
				toasters,
				_List_fromArray(
					[
						_Utils_update(
						toaster,
						{ticks: toaster.ticks + 1})
					]));
		}
	});
var author$project$Toasters$Internal$update = F2(
	function (toasterMsg, toasters) {
		if (toasterMsg.$ === 'Close') {
			var toaster = toasterMsg.a;
			return A2(
				elm$core$List$filter,
				elm$core$Basics$neq(toaster),
				toasters);
		} else {
			return A3(elm$core$List$foldl, author$project$Toasters$Internal$tick, _List_Nil, toasters);
		}
	});
var author$project$Toasters$update = F2(
	function (_n0, _n1) {
		var internalMsg = _n0.a;
		var toasters = _n1.a;
		return author$project$Toasters$Model(
			A2(author$project$Toasters$Internal$update, internalMsg, toasters));
	});
var elm$browser$Browser$Navigation$load = _Browser_load;
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$core$Debug$todo = _Debug_todo;
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.protocol;
		if (_n0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var author$project$Update$update = F2(
	function (msg, model) {
		var _n0 = _Utils_Tuple2(msg, model.page);
		_n0$6:
		while (true) {
			switch (_n0.a.$) {
				case 'Navigate':
					if (_n0.a.a.$ === 'Internal') {
						var url = _n0.a.a.a;
						return _Utils_Tuple2(
							model,
							A2(
								elm$browser$Browser$Navigation$pushUrl,
								model.navigationKey,
								elm$url$Url$toString(url)));
					} else {
						var href = _n0.a.a.a;
						return _Utils_Tuple2(
							model,
							elm$browser$Browser$Navigation$load(href));
					}
				case 'UrlChange':
					var url = _n0.a.a;
					var _n1 = author$project$Route$fromUrl(url);
					if (_n1.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{page: author$project$Page$NotFound}),
							elm$core$Platform$Cmd$none);
					} else {
						switch (_n1.a.$) {
							case 'Index':
								var _n2 = _n1.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											page: author$project$Page$Index(author$project$Index$Model$initialModel)
										}),
									elm$core$Platform$Cmd$none);
							case 'Admin':
								var adminRoute = _n1.a.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											page: author$project$Page$Admin(
												author$project$Admin$Page$fromRoute(adminRoute))
										}),
									elm$core$Platform$Cmd$none);
							case 'Trainer':
								var trainerRoute = _n1.a.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{page: author$project$Page$NotFound}),
									elm$core$Platform$Cmd$none);
							default:
								var _n3 = _n1.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{page: author$project$Page$Test}),
									elm$core$Platform$Cmd$none);
						}
					}
				case 'ToastersMsg':
					var toasterMsg = _n0.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								toasters: A2(author$project$Toasters$update, toasterMsg, model.toasters)
							}),
						elm$core$Platform$Cmd$none);
				case 'ToggleAdminMenu':
					var _n4 = _n0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isAdminMenuOpen: !model.isAdminMenuOpen}),
						elm$core$Platform$Cmd$none);
				case 'IndexMsg':
					if (_n0.b.$ === 'Index') {
						var indexMsg = _n0.a.a;
						var indexModel = _n0.b.a;
						return A2(
							elm$core$Tuple$mapSecond,
							elm$core$Platform$Cmd$map(author$project$Msg$IndexMsg),
							A2(
								elm$core$Tuple$mapFirst,
								function (indexModel_) {
									return _Utils_update(
										model,
										{
											page: author$project$Page$Index(indexModel_)
										});
								},
								A2(author$project$Index$Update$update, indexMsg, indexModel)));
					} else {
						break _n0$6;
					}
				default:
					break _n0$6;
			}
		}
		return _Debug_todo(
			'Update',
			{
				start: {line: 54, column: 13},
				end: {line: 54, column: 23}
			})('other updates');
	});
var author$project$Main$init = F2(
	function (url, navigationKey) {
		return A2(
			author$project$Update$update,
			author$project$Msg$UrlChange(url),
			author$project$Model$initialModel(navigationKey));
	});
var author$project$Msg$Navigate = function (a) {
	return {$: 'Navigate', a: a};
};
var author$project$Msg$ToastersMsg = function (a) {
	return {$: 'ToastersMsg', a: a};
};
var author$project$Toasters$InternalMsg = function (a) {
	return {$: 'InternalMsg', a: a};
};
var author$project$Toasters$Internal$Tick = {$: 'Tick'};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$core$Process$kill = _Scheduler_kill;
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 'Nothing') {
			return A3(
				elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm$core$Dict$insert,
				interval,
				A2(elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$time$Time$setInterval = _Time_setInterval;
var elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm$core$Process$spawn(
				A2(
					elm$time$Time$setInterval,
					interval,
					A2(elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm$time$Time$spawnHelp,
					router,
					rest,
					A3(elm$core$Dict$insert, interval, id, processes));
			};
			return A2(elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm$time$Time$onEffects = F3(
	function (router, subs, _n0) {
		var processes = _n0.processes;
		var rightStep = F3(
			function (_n6, id, _n7) {
				var spawns = _n7.a;
				var existing = _n7.b;
				var kills = _n7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						elm$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm$core$Process$kill(id)));
			});
		var newTaggers = A3(elm$core$List$foldl, elm$time$Time$addMySub, elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _n3) {
				var spawns = _n3.a;
				var existing = _n3.b;
				var kills = _n3.c;
				return _Utils_Tuple3(
					spawns,
					A3(elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm$core$Dict$empty,
				elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm$core$Task$andThen,
			function (newProcesses) {
				return elm$core$Task$succeed(
					A2(elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.taggers);
		if (_n0.$ === 'Nothing') {
			return elm$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm$core$Task$sequence(
					A2(
						elm$core$List$map,
						function (tagger) {
							return A2(
								elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$succeed(state);
				},
				A2(elm$core$Task$andThen, tellTaggers, elm$time$Time$now));
		}
	});
var elm$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm$time$Time$Every,
			interval,
			A2(elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm$time$Time$init, elm$time$Time$onEffects, elm$time$Time$onSelfMsg, 0, elm$time$Time$subMap);
var elm$time$Time$subscription = _Platform_leaf('Time');
var elm$time$Time$every = F2(
	function (interval, tagger) {
		return elm$time$Time$subscription(
			A2(elm$time$Time$Every, interval, tagger));
	});
var author$project$Toasters$Internal$subscription = function (toasters) {
	var _n0 = elm$core$List$isEmpty(toasters);
	if (!_n0) {
		return A2(
			elm$time$Time$every,
			50,
			elm$core$Basics$always(author$project$Toasters$Internal$Tick));
	} else {
		return elm$core$Platform$Sub$none;
	}
};
var author$project$Toasters$subscription = function (_n0) {
	var toasters = _n0.a;
	return A2(
		elm$core$Platform$Sub$map,
		author$project$Toasters$InternalMsg,
		author$project$Toasters$Internal$subscription(toasters));
};
var author$project$Subscriptions$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(
				elm$core$Platform$Sub$map,
				author$project$Msg$ToastersMsg,
				author$project$Toasters$subscription(model.toasters))
			]));
};
var rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var rtfeldman$elm_css$Css$absolute = {position: rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
var rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2(rtfeldman$elm_css$Css$property, key, arg.value);
	});
var rtfeldman$elm_css$Css$position = rtfeldman$elm_css$Css$prop1('position');
var rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var elm$core$String$fromFloat = _String_fromNumber;
var rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: rtfeldman$elm_css$Css$Structure$Compatible,
			calc: rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: rtfeldman$elm_css$Css$Structure$Compatible,
			length: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var rtfeldman$elm_css$Css$px = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$PxUnits, 'px');
var rtfeldman$elm_css$Css$right = rtfeldman$elm_css$Css$prop1('right');
var rtfeldman$elm_css$Css$top = rtfeldman$elm_css$Css$prop1('top');
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var Skinney$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var Skinney$murmur3$Murmur3$mur = F2(
	function (c, h) {
		return 4294967295 & (((h & 65535) * c) + ((65535 & ((h >>> 16) * c)) << 16));
	});
var elm$core$Bitwise$or = _Bitwise_or;
var elm$core$Bitwise$xor = _Bitwise_xor;
var Skinney$murmur3$Murmur3$mix = F2(
	function (h1, h2) {
		var k1 = A2(Skinney$murmur3$Murmur3$mur, 3432918353, h2);
		return h1 ^ A2(Skinney$murmur3$Murmur3$mur, 461845907, (k1 >>> 17) | (k1 << 15));
	});
var Skinney$murmur3$Murmur3$finalize = function (data) {
	var acc = data.hash ? A2(Skinney$murmur3$Murmur3$mix, data.seed, data.hash) : data.seed;
	var h1 = acc ^ data.charsProcessed;
	var h2 = A2(Skinney$murmur3$Murmur3$mur, 2246822507, h1 ^ (h1 >>> 16));
	var h3 = A2(Skinney$murmur3$Murmur3$mur, 3266489909, h2 ^ (h2 >>> 13));
	return (h3 ^ (h3 >>> 16)) >>> 0;
};
var Skinney$murmur3$Murmur3$step = function (acc) {
	var h1 = A2(Skinney$murmur3$Murmur3$mur, 5, (acc >>> 19) | (acc << 13));
	return ((h1 & 65535) + 27492) + ((65535 & ((h1 >>> 16) + 58964)) << 16);
};
var Skinney$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | (c << data.shift);
		var _n0 = data.shift;
		if (_n0 === 24) {
			var newHash = Skinney$murmur3$Murmur3$step(
				A2(Skinney$murmur3$Murmur3$mix, data.seed, res));
			return {charsProcessed: data.charsProcessed + 1, hash: 0, seed: newHash, shift: 0};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var Skinney$murmur3$UTF8$accumulate = F3(
	function (add, _char, _n0) {
		var acc = _n0.a;
		var combine = _n0.b;
		if (combine.$ === 'Nothing') {
			return (_char < 128) ? _Utils_Tuple2(
				A2(add, _char, acc),
				elm$core$Maybe$Nothing) : ((_char < 2048) ? _Utils_Tuple2(
				A2(
					add,
					128 | (63 & _char),
					A2(add, 192 | (_char >>> 6), acc)),
				elm$core$Maybe$Nothing) : (((_char < 55296) || (_char >= 57344)) ? _Utils_Tuple2(
				A2(
					add,
					128 | (63 & _char),
					A2(
						add,
						128 | (63 & (_char >>> 6)),
						A2(add, 224 | (_char >>> 12), acc))),
				elm$core$Maybe$Nothing) : _Utils_Tuple2(
				acc,
				elm$core$Maybe$Just(_char))));
		} else {
			var prev = combine.a;
			var combined = ((1023 & _char) | ((1023 & prev) << 10)) + 65536;
			return _Utils_Tuple2(
				A2(
					add,
					128 | (63 & combined),
					A2(
						add,
						128 | (63 & (combined >>> 6)),
						A2(
							add,
							128 | (63 & (combined >>> 12)),
							A2(add, 240 | (combined >>> 18), acc)))),
				elm$core$Maybe$Nothing);
		}
	});
var elm$core$String$foldl = _String_foldl;
var Skinney$murmur3$UTF8$foldl = F3(
	function (op, acc, input) {
		var helper = F2(
			function (_char, res) {
				return A3(
					Skinney$murmur3$UTF8$accumulate,
					op,
					elm$core$Char$toCode(_char),
					res);
			});
		return A3(
			elm$core$String$foldl,
			helper,
			_Utils_Tuple2(acc, elm$core$Maybe$Nothing),
			input).a;
	});
var Skinney$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return Skinney$murmur3$Murmur3$finalize(
			A3(
				Skinney$murmur3$UTF8$foldl,
				Skinney$murmur3$Murmur3$hashFold,
				A4(Skinney$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var elm$core$String$cons = _String_cons;
var rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_n0) {
	var declarations = _n0.a;
	return declarations;
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _n1 = declarations.a.a;
				var firstSelector = _n1.a;
				var otherSelectors = _n1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2(elm$core$List$cons, firstSelector, otherSelectors),
					rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 'PageRule', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _n0) {
		var firstSelector = _n0.a;
		var otherSelectors = _n0.b;
		var properties = _n0.c;
		return A3(
			rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2(rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _n1 = declarations.a;
						var mediaQueries = _n1.a;
						var styleBlocks = _n1.b;
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									rtfeldman$elm_css$Css$Structure$mapLast,
									rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2(elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _n0) {
		var sequence = _n0.a;
		var selectors = _n0.b;
		return A3(
			rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			elm$core$Maybe$Just(pseudo));
	});
var rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _n1 = list.a;
				var combinator = _n1.a;
				var sequence = _n1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				rtfeldman$elm_css$Css$Structure$Selector,
				A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_n0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								elm$core$List$map,
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _n1 = declarations.a;
									var mediaQueries = _n1.a;
									var _n2 = _n1.b;
									var styleBlock = _n2.a;
									return _List_fromArray(
										[
											A2(
											rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _n3 = declarations.a;
									var mediaQueries = _n3.a;
									var _n4 = _n3.b;
									var first = _n4.a;
									var rest = _n4.b;
									var _n5 = A2(
										rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2(rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_n5.b && (_n5.a.$ === 'MediaRule')) && (!_n5.b.b)) {
										var _n6 = _n5.a;
										var newMediaQueries = _n6.a;
										var newStyleBlocks = _n6.b;
										return _List_fromArray(
											[
												A2(
												rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2(elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _n5;
										return newDeclarations;
									}
								}
							} else {
								break _n0$12;
							}
						case 'SupportsRule':
							var _n7 = declarations.a;
							var str = _n7.a;
							var nestedDeclarations = _n7.b;
							return _List_fromArray(
								[
									A2(
									rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _n8 = declarations.a;
							var str1 = _n8.a;
							var str2 = _n8.b;
							var str3 = _n8.c;
							var str4 = _n8.d;
							var styleBlock = _n8.e;
							return A2(
								elm$core$List$map,
								A4(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							var _n9 = declarations.a;
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _n0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			elm$core$List$cons,
			first,
			A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var rtfeldman$elm_css$Hash$murmurSeed = 15739;
var elm$core$String$fromList = _String_fromList;
var rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2(elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var rtfeldman$elm_hex$Hex$toString = function (num) {
	return elm$core$String$fromList(
		(num < 0) ? A2(
			elm$core$List$cons,
			_Utils_chr('-'),
			A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		elm$core$String$cons,
		_Utils_chr('_'),
		rtfeldman$elm_hex$Hex$toString(
			A2(Skinney$murmur3$Murmur3$hashString, rtfeldman$elm_css$Hash$murmurSeed, str)));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				elm$core$List$tail(decls));
		};
		var nextResult = A2(
			rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _n14 = _Utils_Tuple2(
				elm$core$List$head(nextResult),
				rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_n14.a.$ === 'Just') && (_n14.b.$ === 'Just')) {
				var nextResultParent = _n14.a.a;
				var originalParent = _n14.b.a;
				return _Utils_ap(
					A2(
						elm$core$List$take,
						elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return elm$core$List$concat(
				A2(
					rtfeldman$elm_css$Css$Structure$mapLast,
					rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						elm$core$List$map,
						elm$core$List$singleton,
						A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				elm$core$Maybe$map,
				insertStylesToNestedDecl,
				rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _n4 = styles.a;
					var selector = _n4.a;
					var nestedStyles = _n4.b;
					var rest = styles.b;
					return A4(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _n5 = styles.a;
					var selectorCombinator = _n5.a;
					var snippets = _n5.b;
					var rest = styles.b;
					var chain = F2(
						function (_n9, _n10) {
							var originalSequence = _n9.a;
							var originalTuples = _n9.b;
							var originalPseudoElement = _n9.c;
							var newSequence = _n10.a;
							var newTuples = _n10.b;
							var newPseudoElement = _n10.c;
							return A3(
								rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _n7 = declaration.a;
								var firstSelector = _n7.a;
								var otherSelectors = _n7.b;
								var nestedStyles = _n7.c;
								var newSelectors = A2(
									elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											elm$core$List$map,
											chain(originalSelector),
											A2(elm$core$List$cons, firstSelector, otherSelectors));
									},
									rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									elm$core$List$map,
									A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								elm$core$List$map,
								expandDeclaration,
								A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _n11 = styles.a;
					var pseudoElement = _n11.a;
					var nestedStyles = _n11.b;
					var rest = styles.b;
					return A4(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2(rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _n12 = styles.a;
					var mediaQueries = _n12.a;
					var nestedStyles = _n12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _n13 = rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_n13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _n13.a;
							var otherSelectors = _n13.b;
							return A2(
								elm$core$List$map,
								rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									elm$core$List$singleton(
										rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_n2) {
	var firstSelector = _n2.a;
	var otherSelectors = _n2.b;
	var styles = _n2.c;
	return A2(
		rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				elm$core$List$map,
				rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2(elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2(rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				elm$core$List$map,
				A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_n0) {
	var charset = _n0.charset;
	var imports = _n0.imports;
	var namespaces = _n0.namespaces;
	var snippets = _n0.snippets;
	var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _n0) {
		var keyframesByName = _n0.a;
		var declarations = _n0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _n2 = declaration.a;
				var properties = _n2.c;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					elm$core$List$all,
					function (_n3) {
						var properties = _n3.c;
						return elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.b;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3(elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					elm$core$List$all,
					function (_n4) {
						var properties = _n4.b;
						return elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
		}
	});
var rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			elm$core$List$append,
			A2(
				elm$core$List$map,
				function (_n0) {
					var name = _n0.a;
					var decl = _n0.b;
					return rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_n0) {
	var charset = _n0.charset;
	var imports = _n0.imports;
	var namespaces = _n0.namespaces;
	var declarations = _n0.declarations;
	var _n1 = A3(
		elm$core$List$foldr,
		rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2(elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _n1.a;
	var compactedDeclarations = _n1.b;
	var finalDeclarations = A2(rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {charset: charset, declarations: finalDeclarations, imports: imports, namespaces: namespaces};
};
var rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		elm$core$Maybe$withDefault,
		'',
		A2(
			elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		elm$core$Maybe$withDefault,
		'',
		A2(
			elm$core$Maybe$map,
			elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				elm$core$String$join,
				' and ',
				A2(
					elm$core$List$cons,
					rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A2(
				elm$core$String$join,
				' and ',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + (rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var rtfeldman$elm_css$Css$Structure$Output$importToString = function (_n0) {
	var name = _n0.a;
	var mediaQueries = _n0.b;
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$map,
			rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
			mediaQueries));
};
var rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_n0) {
	var prefix = _n0.a;
	var str = _n0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
var rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
	return _Utils_ap(rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
};
var rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
var rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
	return str + ';';
};
var rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$map,
			A2(elm$core$Basics$composeL, rtfeldman$elm_css$Css$Structure$Output$indent, rtfeldman$elm_css$Css$Structure$Output$emitProperty),
			properties));
};
var elm$core$String$append = _String_append;
var rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_n0) {
	var str = _n0.a;
	return '::' + str;
};
var rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$cons,
					str,
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				elm$core$String$join,
				'',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$cons,
					str,
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_n0) {
	var combinator = _n0.a;
	var sequence = _n0.b;
	return A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
				rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_n0) {
	var simpleSelectorSequence = _n0.a;
	var chain = _n0.b;
	var pseudoElement = _n0.c;
	var segments = A2(
		elm$core$List$cons,
		rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				elm$core$Maybe$withDefault,
				'',
				A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return A2(
		elm$core$String$append,
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$filter,
				A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
				segments)),
		pseudoElementsString);
};
var rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _n0) {
		var firstSelector = _n0.a;
		var otherSelectors = _n0.b;
		var properties = _n0.c;
		var selectorStr = A2(
			elm$core$String$join,
			', ',
			A2(
				elm$core$List$map,
				rtfeldman$elm_css$Css$Structure$Output$selectorToString,
				A2(elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return A2(rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A2(
				elm$core$String$join,
				',\n',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				elm$core$String$join,
				'\n\n',
				A2(
					elm$core$List$map,
					A2(
						elm$core$Basics$composeL,
						rtfeldman$elm_css$Css$Structure$Output$indent,
						rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_n0) {
	var charset = _n0.charset;
	var imports = _n0.imports;
	var namespaces = _n0.namespaces;
	var declarations = _n0.declarations;
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(
			elm$core$List$filter,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
					A2(
					elm$core$String$join,
					'\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
					A2(
					elm$core$String$join,
					'\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					elm$core$String$join,
					'\n\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
	return rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		rtfeldman$elm_css$Css$Structure$compactStylesheet(
			rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(elm$core$List$map, rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
};
var rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3(rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, elm$core$Maybe$Nothing);
		return rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3(rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		elm$core$String$cons,
		_Utils_chr('_'),
		rtfeldman$elm_hex$Hex$toString(
			A2(
				Skinney$murmur3$Murmur3$hashString,
				rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
				rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
					elm$core$List$singleton(
						rtfeldman$elm_css$Css$Preprocess$stylesheet(
							elm$core$List$singleton(
								A2(
									rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
									styles,
									rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
};
var rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var classname = rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classProperty = A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(classname));
	return A3(rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
};
var rtfeldman$elm_css$Html$Styled$Attributes$css = rtfeldman$elm_css$Html$Styled$Internal$css;
var author$project$Toasters$Css$absoluteContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
			rtfeldman$elm_css$Css$right(
			rtfeldman$elm_css$Css$px(320)),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$px(20))
		]));
var rtfeldman$elm_css$Css$fixed = {backgroundAttachment: rtfeldman$elm_css$Css$Structure$Compatible, position: rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: rtfeldman$elm_css$Css$Structure$Compatible, value: 'fixed'};
var rtfeldman$elm_css$Css$UnitlessInteger = {$: 'UnitlessInteger'};
var rtfeldman$elm_css$Css$int = function (val) {
	return {
		fontWeight: rtfeldman$elm_css$Css$Structure$Compatible,
		intOrAuto: rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
		number: rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: rtfeldman$elm_css$Css$UnitlessInteger,
		value: elm$core$String$fromInt(val)
	};
};
var rtfeldman$elm_css$Css$zIndex = rtfeldman$elm_css$Css$prop1('z-index');
var author$project$Toasters$Css$fixedContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$fixed),
			rtfeldman$elm_css$Css$zIndex(
			rtfeldman$elm_css$Css$int(101))
		]));
var rtfeldman$elm_css$Css$relative = {position: rtfeldman$elm_css$Css$Structure$Compatible, value: 'relative'};
var author$project$Toasters$Css$relativeContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2(elm$core$String$startsWith, '#', str) ? str : A2(
		elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		color: rtfeldman$elm_css$Css$Structure$Compatible,
		green: 0,
		red: 0,
		value: rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Basics$pow = _Basics_pow;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2(elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return elm$core$Result$Err(
							elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var rtfeldman$elm_hex$Hex$fromString = function (str) {
	if (elm$core$String$isEmpty(str)) {
		return elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2(elm$core$String$startsWith, '-', str)) {
				var list = A2(
					elm$core$Maybe$withDefault,
					_List_Nil,
					elm$core$List$tail(
						elm$core$String$toList(str)));
				return A2(
					elm$core$Result$map,
					elm$core$Basics$negate,
					A3(
						rtfeldman$elm_hex$Hex$fromStringHelp,
						elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					rtfeldman$elm_hex$Hex$fromStringHelp,
					elm$core$String$length(str) - 1,
					elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2(elm$core$Result$mapError, formatError, result);
	}
};
var rtfeldman$elm_css$Css$validHex = F5(
	function (str, _n0, _n1, _n2, _n3) {
		var r1 = _n0.a;
		var r2 = _n0.b;
		var g1 = _n1.a;
		var g2 = _n1.b;
		var b1 = _n2.a;
		var b2 = _n2.b;
		var a1 = _n3.a;
		var a2 = _n3.b;
		var toResult = A2(
			elm$core$Basics$composeR,
			elm$core$String$fromList,
			A2(elm$core$Basics$composeR, elm$core$String$toLower, rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((results.a.a.$ === 'Ok') && (results.a.b.$ === 'Ok')) && (results.b.a.$ === 'Ok')) && (results.b.b.$ === 'Ok')) {
			var _n5 = results.a;
			var red = _n5.a.a;
			var green = _n5.b.a;
			var _n6 = results.b;
			var blue = _n6.a.a;
			var alpha = _n6.b.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				color: rtfeldman$elm_css$Css$Structure$Compatible,
				green: green,
				red: red,
				value: rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2(elm$core$String$startsWith, '#', str) ? A2(elm$core$String$dropLeft, 1, str) : str;
	var _n0 = elm$core$String$toList(withoutHash);
	_n0$4:
	while (true) {
		if ((_n0.b && _n0.b.b) && _n0.b.b.b) {
			if (!_n0.b.b.b.b) {
				var r = _n0.a;
				var _n1 = _n0.b;
				var g = _n1.a;
				var _n2 = _n1.b;
				var b = _n2.a;
				return A5(
					rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_n0.b.b.b.b.b) {
					var r = _n0.a;
					var _n3 = _n0.b;
					var g = _n3.a;
					var _n4 = _n3.b;
					var b = _n4.a;
					var _n5 = _n4.b;
					var a = _n5.a;
					return A5(
						rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_n0.b.b.b.b.b.b) {
						if (!_n0.b.b.b.b.b.b.b) {
							var r1 = _n0.a;
							var _n6 = _n0.b;
							var r2 = _n6.a;
							var _n7 = _n6.b;
							var g1 = _n7.a;
							var _n8 = _n7.b;
							var g2 = _n8.a;
							var _n9 = _n8.b;
							var b1 = _n9.a;
							var _n10 = _n9.b;
							var b2 = _n10.a;
							return A5(
								rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_n0.b.b.b.b.b.b.b.b && (!_n0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _n0.a;
								var _n11 = _n0.b;
								var r2 = _n11.a;
								var _n12 = _n11.b;
								var g1 = _n12.a;
								var _n13 = _n12.b;
								var g2 = _n13.a;
								var _n14 = _n13.b;
								var b1 = _n14.a;
								var _n15 = _n14.b;
								var b2 = _n15.a;
								var _n16 = _n15.b;
								var a1 = _n16.a;
								var _n17 = _n16.b;
								var a2 = _n17.a;
								return A5(
									rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _n0$4;
							}
						}
					} else {
						break _n0$4;
					}
				}
			}
		} else {
			break _n0$4;
		}
	}
	return rtfeldman$elm_css$Css$erroneousHex(str);
};
var author$project$Toasters$Css$timerColor = function (toasterColor) {
	if (toasterColor.$ === 'Green') {
		return rtfeldman$elm_css$Css$hex('387238');
	} else {
		return rtfeldman$elm_css$Css$hex('842520');
	}
};
var rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var rtfeldman$elm_css$Css$borderBottomLeftRadius = rtfeldman$elm_css$Css$prop1('border-bottom-left-radius');
var rtfeldman$elm_css$Css$height = rtfeldman$elm_css$Css$prop1('height');
var rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var rtfeldman$elm_css$Css$pct = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$PercentageUnits, '%');
var rtfeldman$elm_css$Css$width = rtfeldman$elm_css$Css$prop1('width');
var author$project$Toasters$Css$timerBar = F2(
	function (toasterColor, ticks) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$backgroundColor(
					author$project$Toasters$Css$timerColor(toasterColor)),
					rtfeldman$elm_css$Css$width(
					rtfeldman$elm_css$Css$pct(101 - ticks)),
					rtfeldman$elm_css$Css$height(
					rtfeldman$elm_css$Css$px(4)),
					rtfeldman$elm_css$Css$borderBottomLeftRadius(
					rtfeldman$elm_css$Css$px(2))
				]));
	});
var author$project$Toasters$Css$toasterBackgroundColor = function (toasterColor) {
	if (toasterColor.$ === 'Green') {
		return rtfeldman$elm_css$Css$hex('51a351');
	} else {
		return rtfeldman$elm_css$Css$hex('bd362f');
	}
};
var rtfeldman$elm_css$Css$borderBox = {backgroundClip: rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: rtfeldman$elm_css$Css$Structure$Compatible, value: 'border-box'};
var rtfeldman$elm_css$Css$borderRadius = rtfeldman$elm_css$Css$prop1('border-radius');
var rtfeldman$elm_css$Css$prop4 = F5(
	function (key, argA, argB, argC, argD) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value, argD.value])));
	});
var rtfeldman$elm_css$Css$boxShadow4 = rtfeldman$elm_css$Css$prop4('box-shadow');
var rtfeldman$elm_css$Css$boxSizing = rtfeldman$elm_css$Css$prop1('box-sizing');
var rtfeldman$elm_css$Css$cursor = rtfeldman$elm_css$Css$prop1('cursor');
var rtfeldman$elm_css$Css$marginBottom = rtfeldman$elm_css$Css$prop1('margin-bottom');
var rtfeldman$elm_css$Css$opacity = rtfeldman$elm_css$Css$prop1('opacity');
var rtfeldman$elm_css$Css$pointer = {cursor: rtfeldman$elm_css$Css$Structure$Compatible, value: 'pointer'};
var rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2(elm$core$String$join, ', ', args) + ')'));
	});
var rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			alpha: alpha,
			blue: b,
			color: rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				rtfeldman$elm_css$Css$cssFunction,
				'rgba',
				_Utils_ap(
					A2(
						elm$core$List$map,
						elm$core$String$fromInt,
						_List_fromArray(
							[r, g, b])),
					_List_fromArray(
						[
							elm$core$String$fromFloat(alpha)
						])))
		};
	});
var rtfeldman$elm_css$Css$Transitions$Opacity = {$: 'Opacity'};
var rtfeldman$elm_css$Css$Transitions$Transition = function (a) {
	return {$: 'Transition', a: a};
};
var rtfeldman$elm_css$Css$Transitions$durationTransition = F2(
	function (animation, duration) {
		return rtfeldman$elm_css$Css$Transitions$Transition(
			{animation: animation, delay: elm$core$Maybe$Nothing, duration: duration, timing: elm$core$Maybe$Nothing});
	});
var rtfeldman$elm_css$Css$Transitions$opacity = rtfeldman$elm_css$Css$Transitions$durationTransition(rtfeldman$elm_css$Css$Transitions$Opacity);
var rtfeldman$elm_css$Css$Transitions$propToString = function (prop) {
	switch (prop.$) {
		case 'Background':
			return 'background';
		case 'BackgroundColor':
			return 'background-color';
		case 'BackgroundPosition':
			return 'background-position';
		case 'BackgroundSize':
			return 'background-size';
		case 'Border':
			return 'border';
		case 'BorderBottom':
			return 'border-bottom';
		case 'BorderBottomColor':
			return 'border-bottom-color';
		case 'BorderBottomLeftRadius':
			return 'border-bottom-left-radius';
		case 'BorderBottomRightRadius':
			return 'border-bottom-right-radius';
		case 'BorderBottomWidth':
			return 'border-bottom-width';
		case 'BorderColor':
			return 'border-color';
		case 'BorderLeft':
			return 'border-left';
		case 'BorderLeftColor':
			return 'border-left-color';
		case 'BorderLeftWidth':
			return 'border-left-width';
		case 'BorderRadius':
			return 'border-radius';
		case 'BorderRight':
			return 'border-right';
		case 'BorderRightColor':
			return 'border-right-color';
		case 'BorderRightWidth':
			return 'border-right-width';
		case 'BorderTop':
			return 'border-top';
		case 'BorderTopColor':
			return 'border-top-color';
		case 'BorderTopLeftRadius':
			return 'border-top-left-radius';
		case 'BorderTopRightRadius':
			return 'border-top-right-radius';
		case 'BorderTopWidth':
			return 'border-top-width';
		case 'BorderWidth':
			return 'border-width';
		case 'Bottom':
			return 'bottom';
		case 'BoxShadow':
			return 'box-shadow';
		case 'CaretColor':
			return 'caret-color';
		case 'Clip':
			return 'clip';
		case 'ClipPath':
			return 'clip-path';
		case 'Color':
			return 'color';
		case 'ColumnCount':
			return 'column-count';
		case 'ColumnGap':
			return 'column-gap';
		case 'ColumnRule':
			return 'column-rule';
		case 'ColumnRuleColor':
			return 'column-rule-color';
		case 'ColumnRuleWidth':
			return 'column-rule-width';
		case 'ColumnWidth':
			return 'column-width';
		case 'Columns':
			return 'columns';
		case 'Filter':
			return 'filter';
		case 'Flex':
			return 'flex';
		case 'FlexBasis':
			return 'flex-basis';
		case 'FlexGrow':
			return 'flex-grow';
		case 'FlexShrink':
			return 'flex-shrink';
		case 'Font':
			return 'font';
		case 'FontSize':
			return 'font-size';
		case 'FontSizeAdjust':
			return 'font-size-adjust';
		case 'FontStretch':
			return 'font-stretch';
		case 'FontVariationSettings':
			return 'font-variation-settings';
		case 'FontWeight':
			return 'font-weight';
		case 'GridColumnGap':
			return 'grid-column-gap';
		case 'GridGap':
			return 'grid-gap';
		case 'GridRowGap':
			return 'grid-row-gap';
		case 'Height':
			return 'height';
		case 'Left':
			return 'left';
		case 'LetterSpacing':
			return 'letter-spacing';
		case 'LineHeight':
			return 'line-height';
		case 'Margin':
			return 'margin';
		case 'MarginBottom':
			return 'margin-bottom';
		case 'MarginLeft':
			return 'margin-left';
		case 'MarginRight':
			return 'margin-right';
		case 'MarginTop':
			return 'margin-top';
		case 'Mask':
			return 'mask';
		case 'MaskPosition':
			return 'mask-position';
		case 'MaskSize':
			return 'mask-size';
		case 'MaxHeight':
			return 'max-height';
		case 'MaxWidth':
			return 'max-width';
		case 'MinHeight':
			return 'min-height';
		case 'MinWidth':
			return 'min-width';
		case 'ObjectPosition':
			return 'object-position';
		case 'Offset':
			return 'offset';
		case 'OffsetAnchor':
			return 'offset-anchor';
		case 'OffsetDistance':
			return 'offset-distance';
		case 'OffsetPath':
			return 'offset-path';
		case 'OffsetRotate':
			return 'offset-rotate';
		case 'Opacity':
			return 'opacity';
		case 'Order':
			return 'order';
		case 'Outline':
			return 'outline';
		case 'OutlineColor':
			return 'outline-color';
		case 'OutlineOffset':
			return 'outline-offset';
		case 'OutlineWidth':
			return 'outline-width';
		case 'Padding':
			return 'padding';
		case 'PaddingBottom':
			return 'padding-bottom';
		case 'PaddingLeft':
			return 'padding-left';
		case 'PaddingRight':
			return 'padding-right';
		case 'PaddingTop':
			return 'padding-top';
		case 'Right':
			return 'right';
		case 'TabSize':
			return 'tab-size';
		case 'TextIndent':
			return 'text-indent';
		case 'TextShadow':
			return 'text-shadow';
		case 'Top':
			return 'top';
		case 'Transform':
			return 'transform';
		case 'TransformOrigin':
			return 'transform-origin';
		case 'VerticalAlign':
			return 'vertical-align';
		case 'Visibility':
			return 'visibility';
		case 'Width':
			return 'width';
		case 'WordSpacing':
			return 'word-spacing';
		default:
			return 'z-index';
	}
};
var rtfeldman$elm_css$Css$Transitions$timeToString = function (time) {
	return elm$core$String$fromFloat(time) + 'ms';
};
var rtfeldman$elm_css$Css$Transitions$timingFunctionToString = function (tf) {
	switch (tf.$) {
		case 'Ease':
			return 'ease';
		case 'Linear':
			return 'linear';
		case 'EaseIn':
			return 'ease-in';
		case 'EaseOut':
			return 'ease-out';
		case 'EaseInOut':
			return 'ease-in-out';
		case 'StepStart':
			return 'step-start';
		case 'StepEnd':
			return 'step-end';
		default:
			var _float = tf.a;
			var float2 = tf.b;
			var float3 = tf.c;
			var float4 = tf.d;
			return 'cubic-bezier(' + (elm$core$String$fromFloat(_float) + (' , ' + (elm$core$String$fromFloat(float2) + (' , ' + (elm$core$String$fromFloat(float3) + (' , ' + (elm$core$String$fromFloat(float4) + ')')))))));
	}
};
var rtfeldman$elm_css$Css$Transitions$transition = function (options) {
	var v = A3(
		elm$core$String$slice,
		0,
		-1,
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, s) {
					var animation = _n0.a.animation;
					var duration = _n0.a.duration;
					var delay = _n0.a.delay;
					var timing = _n0.a.timing;
					return s + (A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$Transitions$propToString(animation),
								rtfeldman$elm_css$Css$Transitions$timeToString(duration),
								A2(
								elm$core$Maybe$withDefault,
								'',
								A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Transitions$timeToString, delay)),
								A2(
								elm$core$Maybe$withDefault,
								'',
								A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Transitions$timingFunctionToString, timing))
							])) + ',');
				}),
			'',
			options));
	return A2(rtfeldman$elm_css$Css$property, 'transition', v);
};
var author$project$Toasters$Css$toaster = F2(
	function (toasterColor, ticks) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$backgroundColor(
					author$project$Toasters$Css$toasterBackgroundColor(toasterColor)),
					rtfeldman$elm_css$Css$borderRadius(
					rtfeldman$elm_css$Css$px(2)),
					rtfeldman$elm_css$Css$width(
					rtfeldman$elm_css$Css$px(300)),
					rtfeldman$elm_css$Css$marginBottom(
					rtfeldman$elm_css$Css$px(10)),
					rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
					rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
					rtfeldman$elm_css$Css$opacity(
					((ticks < 3) || (ticks > 97)) ? rtfeldman$elm_css$Css$int(0) : rtfeldman$elm_css$Css$int(1)),
					rtfeldman$elm_css$Css$Transitions$transition(
					_List_fromArray(
						[
							rtfeldman$elm_css$Css$Transitions$opacity(
							(ticks < 3) ? 0 : 600)
						])),
					A4(
					rtfeldman$elm_css$Css$boxShadow4,
					rtfeldman$elm_css$Css$px(0),
					rtfeldman$elm_css$Css$px(8),
					rtfeldman$elm_css$Css$px(16),
					A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.3))
				]));
	});
var rtfeldman$elm_css$Css$color = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'color', c.value);
};
var rtfeldman$elm_css$Css$stringsToValue = function (list) {
	return elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A2(
			elm$core$String$join,
			', ',
			A2(
				elm$core$List$map,
				function (s) {
					return s;
				},
				list))
	};
};
var rtfeldman$elm_css$Css$fontFamilies = A2(
	elm$core$Basics$composeL,
	rtfeldman$elm_css$Css$prop1('font-family'),
	rtfeldman$elm_css$Css$stringsToValue);
var rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value])));
	});
var rtfeldman$elm_css$Css$padding2 = rtfeldman$elm_css$Css$prop2('padding');
var author$project$Toasters$Css$toasterMessage = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('ffffff')),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$px(15),
			rtfeldman$elm_css$Css$px(25)),
			rtfeldman$elm_css$Css$fontFamilies(
			_List_fromArray(
				['Arial']))
		]));
var author$project$Toasters$Internal$Close = function (a) {
	return {$: 'Close', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$Node;
var rtfeldman$elm_css$Html$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$node;
var rtfeldman$elm_css$Html$Styled$div = rtfeldman$elm_css$Html$Styled$node('div');
var rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		elm$virtual_dom$VirtualDom$text(str));
};
var rtfeldman$elm_css$Html$Styled$text = rtfeldman$elm_css$VirtualDom$Styled$text;
var rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$on, eventName, handler),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Toasters$Internal$item = function (toaster) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2(author$project$Toasters$Css$toaster, toaster.color, toaster.ticks),
				rtfeldman$elm_css$Html$Styled$Events$onClick(
				author$project$Toasters$Internal$Close(toaster))
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[author$project$Toasters$Css$toasterMessage]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text(toaster.message)
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2(author$project$Toasters$Css$timerBar, toaster.color, toaster.ticks)
					]),
				_List_Nil)
			]));
};
var author$project$Toasters$Internal$view = function (toasters) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[author$project$Toasters$Css$relativeContainer]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[author$project$Toasters$Css$absoluteContainer]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[author$project$Toasters$Css$fixedContainer]),
						A2(elm$core$List$map, author$project$Toasters$Internal$item, toasters))
					]))
			]));
};
var rtfeldman$elm_css$VirtualDom$Styled$KeyedNode = F3(
	function (a, b, c) {
		return {$: 'KeyedNode', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
	function (a, b, c, d) {
		return {$: 'KeyedNodeNS', a: a, b: b, c: c, d: d};
	});
var rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 'NodeNS', a: a, b: b, c: c, d: d};
	});
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var rtfeldman$elm_css$VirtualDom$Styled$mapAttribute = F2(
	function (transform, _n0) {
		var prop = _n0.a;
		var styles = _n0.b;
		var classname = _n0.c;
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$mapAttribute, transform, prop),
			styles,
			classname);
	});
var rtfeldman$elm_css$VirtualDom$Styled$map = F2(
	function (transform, vdomNode) {
		switch (vdomNode.$) {
			case 'Node':
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					rtfeldman$elm_css$VirtualDom$Styled$Node,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 'NodeNS':
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					rtfeldman$elm_css$VirtualDom$Styled$NodeNS,
					ns,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 'KeyedNode':
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					rtfeldman$elm_css$VirtualDom$Styled$KeyedNode,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						function (_n1) {
							var key = _n1.a;
							var child = _n1.b;
							return _Utils_Tuple2(
								key,
								A2(rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			case 'KeyedNodeNS':
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS,
					ns,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						function (_n2) {
							var key = _n2.a;
							var child = _n2.b;
							return _Utils_Tuple2(
								key,
								A2(rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			default:
				var vdom = vdomNode.a;
				return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
					A2(elm$virtual_dom$VirtualDom$map, transform, vdom));
		}
	});
var rtfeldman$elm_css$Html$Styled$map = rtfeldman$elm_css$VirtualDom$Styled$map;
var author$project$Toasters$view = function (_n0) {
	var toasters = _n0.a;
	return A2(
		rtfeldman$elm_css$Html$Styled$map,
		author$project$Toasters$InternalMsg,
		author$project$Toasters$Internal$view(toasters));
};
var author$project$Admin$Route$toString = function (route) {
	if (route.$ === 'Courses') {
		return '/courses';
	} else {
		return '/units';
	}
};
var author$project$Trainer$Route$toString = function (route) {
	if (route.$ === 'TrainingPlan') {
		return '/training-plan';
	} else {
		return '/settings';
	}
};
var author$project$Route$toString = function (route) {
	switch (route.$) {
		case 'Index':
			return '/';
		case 'Admin':
			var adminRoute = route.a;
			return '/admin' + author$project$Admin$Route$toString(adminRoute);
		case 'Trainer':
			var trainerRoute = route.a;
			return '/trainer' + author$project$Trainer$Route$toString(trainerRoute);
		default:
			return '/test';
	}
};
var rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$property, key, value),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			elm$json$Json$Encode$string(string));
	});
var rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2(rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var author$project$Route$href = function (targetRoute) {
	return rtfeldman$elm_css$Html$Styled$Attributes$href(
		author$project$Route$toString(targetRoute));
};
var author$project$View$adminMenu = function (isOpen) {
	if (!isOpen) {
		return rtfeldman$elm_css$Html$Styled$text('');
	} else {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('Admin Menu!')
				]));
	}
};
var rtfeldman$elm_css$Html$Styled$a = rtfeldman$elm_css$Html$Styled$node('a');
var author$project$View$menu = function (isAdminMenuOpen) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$a,
				_List_fromArray(
					[
						author$project$Route$href(author$project$Route$Index)
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('Index')
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$a,
				_List_fromArray(
					[
						author$project$Route$href(
						author$project$Route$Admin(author$project$Admin$Route$Courses))
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('Admin')
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$a,
				_List_fromArray(
					[
						author$project$Route$href(
						author$project$Route$Trainer(author$project$Trainer$Route$TrainingPlan))
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('Trainer')
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$a,
				_List_fromArray(
					[
						author$project$Route$href(author$project$Route$Test)
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('Test')
					])),
				author$project$View$adminMenu(isAdminMenuOpen)
			]));
};
var author$project$Admin$View$view = function (page) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$text('admin view')
			]));
};
var author$project$Button$Button = function (a) {
	return {$: 'Button', a: a};
};
var rtfeldman$elm_css$Css$rgb = F3(
	function (r, g, b) {
		return {
			alpha: 1,
			blue: b,
			color: rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				rtfeldman$elm_css$Css$cssFunction,
				'rgb',
				A2(
					elm$core$List$map,
					elm$core$String$fromInt,
					_List_fromArray(
						[r, g, b])))
		};
	});
var author$project$Button$green = F2(
	function (shouldBeGreen, _n0) {
		var config = _n0.a;
		return shouldBeGreen ? author$project$Button$Button(
			_Utils_update(
				config,
				{
					color: A3(rtfeldman$elm_css$Css$rgb, 81, 163, 81)
				})) : author$project$Button$Button(config);
	});
var author$project$Button$href = F2(
	function (url, _n0) {
		var config = _n0.a;
		return author$project$Button$Button(
			_Utils_update(
				config,
				{
					href: elm$core$Maybe$Just(
						{blank: false, url: url})
				}));
	});
var author$project$Content$Icon = function (a) {
	return {$: 'Icon', a: a};
};
var author$project$Button$icon = F2(
	function (icon_, _n0) {
		var config = _n0.a;
		return author$project$Button$Button(
			_Utils_update(
				config,
				{
					content: author$project$Content$Icon(icon_)
				}));
	});
var author$project$Button$isDisabled = F2(
	function (isDisabled_, _n0) {
		var config = _n0.a;
		return author$project$Button$Button(
			_Utils_update(
				config,
				{isDisabled: isDisabled_}));
	});
var author$project$Button$isLoading = F2(
	function (isLoading_, _n0) {
		var config = _n0.a;
		return author$project$Button$Button(
			_Utils_update(
				config,
				{isLoading: isLoading_}));
	});
var author$project$Button$onClick = F2(
	function (msg, _n0) {
		var config = _n0.a;
		return author$project$Button$Button(
			_Utils_update(
				config,
				{
					onClick: elm$core$Maybe$Just(msg)
				}));
	});
var author$project$Button$red = F2(
	function (shouldBeRed, _n0) {
		var config = _n0.a;
		return shouldBeRed ? author$project$Button$Button(
			_Utils_update(
				config,
				{
					color: A3(rtfeldman$elm_css$Css$rgb, 189, 54, 47)
				})) : author$project$Button$Button(config);
	});
var author$project$Button$iconSize = function (size) {
	if (size.$ === 'Small') {
		return 14;
	} else {
		return 18;
	}
};
var author$project$Button$Css$loading = function (size) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		_List_fromArray(
			[
				A2(rtfeldman$elm_css$Css$property, 'animation', 'spin 1.5s linear infinite'),
				rtfeldman$elm_css$Css$height(
				rtfeldman$elm_css$Css$px(size))
			]));
};
var rtfeldman$elm_css$Css$marginLeft = rtfeldman$elm_css$Css$prop1('margin-left');
var rtfeldman$elm_css$Css$RemUnits = {$: 'RemUnits'};
var rtfeldman$elm_css$Css$rem = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$RemUnits, 'rem');
var author$project$Button$Css$loadingText = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$marginLeft(
			rtfeldman$elm_css$Css$rem(0.25))
		]));
var rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a;
					var key = A2(
						elm$core$Maybe$withDefault,
						'',
						elm$core$List$head(
							A2(elm$core$String$split, ':', str)));
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _n1 = style.a;
							var only = _n1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _n2 = style.a;
							var first = _n2.a;
							var rest = _n2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var rtfeldman$elm_css$Css$alignItems = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var rtfeldman$elm_css$Css$center = rtfeldman$elm_css$Css$prop1('center');
var rtfeldman$elm_css$Css$displayFlex = A2(rtfeldman$elm_css$Css$property, 'display', 'flex');
var rtfeldman$elm_css$Css$justifyContent = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'justifyContent',
		'justify-content',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var author$project$Button$Css$loadingTextContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center)
		]));
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$polyline = elm$svg$Svg$trustedNode('polyline');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var feathericons$elm_feather$FeatherIcons$Icon = function (a) {
	return {$: 'Icon', a: a};
};
var feathericons$elm_feather$FeatherIcons$defaultAttributes = function (name) {
	return {
		_class: elm$core$Maybe$Just('feather feather-' + name),
		size: 24,
		sizeUnit: '',
		strokeWidth: 2,
		viewBox: '0 0 24 24'
	};
};
var feathericons$elm_feather$FeatherIcons$makeBuilder = F2(
	function (name, src) {
		return feathericons$elm_feather$FeatherIcons$Icon(
			{
				attrs: feathericons$elm_feather$FeatherIcons$defaultAttributes(name),
				src: src
			});
	});
var feathericons$elm_feather$FeatherIcons$xmlns = function (s) {
	return A2(
		elm$virtual_dom$VirtualDom$property,
		'xmlns',
		elm$json$Json$Encode$string(s));
};
var feathericons$elm_feather$FeatherIcons$refreshCw = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'refresh-cw',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-refresh-cw')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$polyline,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('23 4 23 10 17 10')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$polyline,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('1 20 1 14 7 14')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$path,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$d('M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15')
						]),
					_List_Nil)
				]))
		]));
var elm$svg$Svg$map = elm$virtual_dom$VirtualDom$map;
var feathericons$elm_feather$FeatherIcons$toHtml = F2(
	function (attributes, _n0) {
		var src = _n0.a.src;
		var attrs = _n0.a.attrs;
		var strSize = elm$core$String$fromFloat(attrs.size);
		var baseAttributes = _List_fromArray(
			[
				elm$svg$Svg$Attributes$fill('none'),
				elm$svg$Svg$Attributes$height(
				_Utils_ap(strSize, attrs.sizeUnit)),
				elm$svg$Svg$Attributes$width(
				_Utils_ap(strSize, attrs.sizeUnit)),
				elm$svg$Svg$Attributes$stroke('currentColor'),
				elm$svg$Svg$Attributes$strokeLinecap('round'),
				elm$svg$Svg$Attributes$strokeLinejoin('round'),
				elm$svg$Svg$Attributes$strokeWidth(
				elm$core$String$fromFloat(attrs.strokeWidth)),
				elm$svg$Svg$Attributes$viewBox(attrs.viewBox)
			]);
		var combinedAttributes = _Utils_ap(
			function () {
				var _n1 = attrs._class;
				if (_n1.$ === 'Just') {
					var c = _n1.a;
					return A2(
						elm$core$List$cons,
						elm$svg$Svg$Attributes$class(c),
						baseAttributes);
				} else {
					return baseAttributes;
				}
			}(),
			attributes);
		return A2(
			elm$svg$Svg$svg,
			combinedAttributes,
			A2(
				elm$core$List$map,
				elm$svg$Svg$map(elm$core$Basics$never),
				src));
	});
var feathericons$elm_feather$FeatherIcons$withSize = F2(
	function (size, _n0) {
		var attrs = _n0.a.attrs;
		var src = _n0.a.src;
		return feathericons$elm_feather$FeatherIcons$Icon(
			{
				attrs: _Utils_update(
					attrs,
					{size: size}),
				src: src
			});
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var rtfeldman$elm_css$Html$Styled$fromUnstyled = rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var author$project$Button$content = F4(
	function (content_, size, color, isLoading_) {
		var _n0 = _Utils_Tuple2(content_, isLoading_);
		if (_n0.a.$ === 'Text') {
			if (!_n0.b) {
				var string = _n0.a.a;
				return rtfeldman$elm_css$Html$Styled$text(string);
			} else {
				var string = _n0.a.a;
				return A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[author$project$Button$Css$loadingTextContainer]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									author$project$Button$Css$loading(
									author$project$Button$iconSize(size))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(
										feathericons$elm_feather$FeatherIcons$toHtml,
										_List_Nil,
										A2(
											feathericons$elm_feather$FeatherIcons$withSize,
											author$project$Button$iconSize(size),
											feathericons$elm_feather$FeatherIcons$refreshCw)))
								])),
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[author$project$Button$Css$loadingText]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(string)
								]))
						]));
			}
		} else {
			if (!_n0.b) {
				var icon_ = _n0.a.a;
				return rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(
							feathericons$elm_feather$FeatherIcons$withSize,
							author$project$Button$iconSize(size),
							icon_)));
			} else {
				return A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							author$project$Button$Css$loading(
							author$project$Button$iconSize(size))
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(
								feathericons$elm_feather$FeatherIcons$toHtml,
								_List_Nil,
								A2(
									feathericons$elm_feather$FeatherIcons$withSize,
									author$project$Button$iconSize(size),
									feathericons$elm_feather$FeatherIcons$refreshCw)))
						]));
			}
		}
	});
var author$project$Button$Css$buttonHeight = function (size) {
	if (size.$ === 'Small') {
		return rtfeldman$elm_css$Css$rem(1.4);
	} else {
		return rtfeldman$elm_css$Css$rem(1.8);
	}
};
var author$project$Button$Css$buttonPadding = F2(
	function (content, size) {
		var _n0 = _Utils_Tuple2(content, size);
		if (_n0.a.$ === 'Text') {
			if (_n0.b.$ === 'Small') {
				var _n1 = _n0.b;
				return rtfeldman$elm_css$Css$rem(0.5);
			} else {
				var _n2 = _n0.b;
				return rtfeldman$elm_css$Css$rem(0.8);
			}
		} else {
			return rtfeldman$elm_css$Css$rem(0);
		}
	});
var rtfeldman$elm_css$Css$auto = {alignItemsOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, cursor: rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, justifyContentOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible, overflow: rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: rtfeldman$elm_css$Css$Structure$Compatible, textRendering: rtfeldman$elm_css$Css$Structure$Compatible, touchAction: rtfeldman$elm_css$Css$Structure$Compatible, value: 'auto'};
var author$project$Button$Css$buttonWidth = F2(
	function (content, size) {
		var _n0 = _Utils_Tuple2(content, size);
		if (_n0.a.$ === 'Icon') {
			if (_n0.b.$ === 'Small') {
				var _n1 = _n0.b;
				return rtfeldman$elm_css$Css$width(
					rtfeldman$elm_css$Css$rem(1.4));
			} else {
				var _n2 = _n0.b;
				return rtfeldman$elm_css$Css$width(
					rtfeldman$elm_css$Css$rem(1.8));
			}
		} else {
			return rtfeldman$elm_css$Css$width(rtfeldman$elm_css$Css$auto);
		}
	});
var author$project$Button$Css$lightenColor = function (color) {
	return A4(rtfeldman$elm_css$Css$rgba, color.red, color.green, color.blue, 0.2);
};
var rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value])));
	});
var rtfeldman$elm_css$Css$border3 = rtfeldman$elm_css$Css$prop3('border');
var rtfeldman$elm_css$Css$display = rtfeldman$elm_css$Css$prop1('display');
var rtfeldman$elm_css$Css$fontSize = rtfeldman$elm_css$Css$prop1('font-size');
var rtfeldman$elm_css$Css$hidden = {borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, overflow: rtfeldman$elm_css$Css$Structure$Compatible, value: 'hidden', visibility: rtfeldman$elm_css$Css$Structure$Compatible};
var rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var rtfeldman$elm_css$Css$hover = rtfeldman$elm_css$Css$pseudoClass('hover');
var elm$core$String$endsWith = _String_endsWith;
var rtfeldman$elm_css$Css$makeImportant = function (str) {
	return A2(
		elm$core$String$endsWith,
		' !important',
		elm$core$String$toLower(str)) ? str : (str + ' !important');
};
var rtfeldman$elm_css$Css$Preprocess$mapAllLastProperty = F2(
	function (update, styles) {
		if (!styles.b) {
			return styles;
		} else {
			if (!styles.b.b) {
				var only = styles.a;
				return _List_fromArray(
					[
						A2(rtfeldman$elm_css$Css$Preprocess$mapLastProperty, update, only)
					]);
			} else {
				var first = styles.a;
				var rest = styles.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Preprocess$mapAllLastProperty, update, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Preprocess$mapLastProperty = F2(
	function (update, style) {
		switch (style.$) {
			case 'AppendProperty':
				var property = style.a;
				return rtfeldman$elm_css$Css$Preprocess$AppendProperty(
					update(property));
			case 'ExtendSelector':
				var selector = style.a;
				var styles = style.b;
				return A2(
					rtfeldman$elm_css$Css$Preprocess$ExtendSelector,
					selector,
					A2(rtfeldman$elm_css$Css$Preprocess$mapAllLastProperty, update, styles));
			case 'NestSnippet':
				return style;
			case 'WithPseudoElement':
				return style;
			case 'WithMedia':
				return style;
			case 'WithKeyframes':
				return style;
			default:
				var otherStyles = style.a;
				return rtfeldman$elm_css$Css$Preprocess$ApplyStyles(
					A2(
						rtfeldman$elm_css$Css$Structure$mapLast,
						rtfeldman$elm_css$Css$Preprocess$mapLastProperty(update),
						otherStyles));
		}
	});
var rtfeldman$elm_css$Css$important = rtfeldman$elm_css$Css$Preprocess$mapLastProperty(rtfeldman$elm_css$Css$makeImportant);
var rtfeldman$elm_css$Css$inlineFlex = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline-flex'};
var rtfeldman$elm_css$Css$margin2 = rtfeldman$elm_css$Css$prop2('margin');
var rtfeldman$elm_css$Css$middle = rtfeldman$elm_css$Css$prop1('middle');
var rtfeldman$elm_css$Css$noWrap = {flexDirectionOrWrap: rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: rtfeldman$elm_css$Css$Structure$Compatible, value: 'nowrap', whiteSpace: rtfeldman$elm_css$Css$Structure$Compatible};
var rtfeldman$elm_css$Css$none = {backgroundImage: rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, cursor: rtfeldman$elm_css$Css$Structure$Compatible, display: rtfeldman$elm_css$Css$Structure$Compatible, hoverCapability: rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, keyframes: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: rtfeldman$elm_css$Css$Structure$Compatible, none: rtfeldman$elm_css$Css$Structure$Compatible, outline: rtfeldman$elm_css$Css$Structure$Compatible, pointerDevice: rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: rtfeldman$elm_css$Css$Structure$Compatible, resize: rtfeldman$elm_css$Css$Structure$Compatible, scriptingSupport: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: rtfeldman$elm_css$Css$Structure$Compatible, textTransform: rtfeldman$elm_css$Css$Structure$Compatible, touchAction: rtfeldman$elm_css$Css$Structure$Compatible, transform: rtfeldman$elm_css$Css$Structure$Compatible, updateFrequency: rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'};
var rtfeldman$elm_css$Css$notAllowed = {cursor: rtfeldman$elm_css$Css$Structure$Compatible, value: 'not-allowed'};
var rtfeldman$elm_css$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var rtfeldman$elm_css$Css$num = function (val) {
	return {
		lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
		number: rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: rtfeldman$elm_css$Css$UnitlessFloat,
		value: elm$core$String$fromFloat(val)
	};
};
var rtfeldman$elm_css$Css$outlineWidth = rtfeldman$elm_css$Css$prop1('outline-width');
var rtfeldman$elm_css$Css$overflow = rtfeldman$elm_css$Css$prop1('overflow');
var rtfeldman$elm_css$Css$solid = {borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: rtfeldman$elm_css$Css$Structure$Compatible, value: 'solid'};
var rtfeldman$elm_css$Css$textDecoration = rtfeldman$elm_css$Css$prop1('text-decoration');
var rtfeldman$elm_css$Css$transparent = {color: rtfeldman$elm_css$Css$Structure$Compatible, value: 'transparent'};
var rtfeldman$elm_css$Css$verticalAlign = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'verticalAlign',
		'vertical-align',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var rtfeldman$elm_css$Css$whiteSpace = rtfeldman$elm_css$Css$prop1('white-space');
var author$project$Button$Css$button = F5(
	function (size, content, color, isDisabled, isLoading) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					A3(
					rtfeldman$elm_css$Css$border3,
					rtfeldman$elm_css$Css$px(1),
					rtfeldman$elm_css$Css$solid,
					A4(rtfeldman$elm_css$Css$rgba, color.red, color.green, color.blue, 0.2)),
					rtfeldman$elm_css$Css$borderRadius(
					rtfeldman$elm_css$Css$px(2)),
					rtfeldman$elm_css$Css$backgroundColor(rtfeldman$elm_css$Css$transparent),
					rtfeldman$elm_css$Css$important(
					rtfeldman$elm_css$Css$color(color)),
					rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineFlex),
					rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
					rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
					rtfeldman$elm_css$Css$outlineWidth(
					rtfeldman$elm_css$Css$px(0)),
					rtfeldman$elm_css$Css$cursor(
					(isDisabled || isLoading) ? rtfeldman$elm_css$Css$notAllowed : rtfeldman$elm_css$Css$pointer),
					rtfeldman$elm_css$Css$opacity(
					isDisabled ? rtfeldman$elm_css$Css$num(0.4) : rtfeldman$elm_css$Css$num(1)),
					rtfeldman$elm_css$Css$height(
					author$project$Button$Css$buttonHeight(size)),
					A2(author$project$Button$Css$buttonWidth, content, size),
					A2(
					rtfeldman$elm_css$Css$padding2,
					rtfeldman$elm_css$Css$px(0),
					A2(author$project$Button$Css$buttonPadding, content, size)),
					rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
					A2(
					rtfeldman$elm_css$Css$margin2,
					rtfeldman$elm_css$Css$px(0),
					rtfeldman$elm_css$Css$rem(0.2)),
					rtfeldman$elm_css$Css$fontSize(
					rtfeldman$elm_css$Css$rem(0.8)),
					rtfeldman$elm_css$Css$verticalAlign(rtfeldman$elm_css$Css$middle),
					rtfeldman$elm_css$Css$important(
					rtfeldman$elm_css$Css$textDecoration(rtfeldman$elm_css$Css$none)),
					A2(rtfeldman$elm_css$Css$property, 'user-select', 'none'),
					rtfeldman$elm_css$Css$whiteSpace(rtfeldman$elm_css$Css$noWrap),
					rtfeldman$elm_css$Css$overflow(rtfeldman$elm_css$Css$hidden),
					rtfeldman$elm_css$Css$hover(
					_List_fromArray(
						[
							rtfeldman$elm_css$Css$backgroundColor(
							author$project$Button$Css$lightenColor(color))
						]))
				]));
	});
var rtfeldman$elm_css$Css$Global$global = function (snippets) {
	return rtfeldman$elm_css$VirtualDom$Styled$unstyledNode(
		A3(
			elm$virtual_dom$VirtualDom$node,
			'style',
			_List_Nil,
			elm$core$List$singleton(
				elm$virtual_dom$VirtualDom$text(
					rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
						elm$core$List$singleton(
							rtfeldman$elm_css$Css$Preprocess$stylesheet(snippets)))))));
};
var rtfeldman$elm_css$Css$Global$selector = F2(
	function (selectorStr, styles) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
			styles,
			A2(rtfeldman$elm_css$Css$Structure$CustomSelector, selectorStr, _List_Nil));
	});
var author$project$Button$Css$spinKeyFrames = rtfeldman$elm_css$Css$Global$global(
	_List_fromArray(
		[
			A2(
			rtfeldman$elm_css$Css$Global$selector,
			'@keyframes spin',
			_List_fromArray(
				[
					A2(rtfeldman$elm_css$Css$property, '0% { transform', 'rotate(0deg); } 100% { transform: rotate(360deg); }')
				]))
		]));
var rtfeldman$elm_css$Html$Styled$Attributes$class = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('className');
var author$project$Html$Styled$Bdt$attributeIf = F2(
	function (bool, attribute) {
		return bool ? attribute : rtfeldman$elm_css$Html$Styled$Attributes$class('');
	});
var author$project$Html$Styled$Bdt$maybeAttribute = F2(
	function (f, maybe) {
		if (maybe.$ === 'Nothing') {
			return rtfeldman$elm_css$Html$Styled$Attributes$class('');
		} else {
			var a = maybe.a;
			return f(a);
		}
	});
var rtfeldman$elm_css$Html$Styled$button = rtfeldman$elm_css$Html$Styled$node('button');
var rtfeldman$elm_css$Html$Styled$Attributes$target = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('target');
var author$project$Button$render = function (_n0) {
	var config = _n0.a;
	var _n1 = _Utils_Tuple2(config.isDisabled, config.href);
	if (_n1.a) {
		return A2(
			rtfeldman$elm_css$Html$Styled$button,
			_List_fromArray(
				[
					A5(author$project$Button$Css$button, config.size, config.content, config.color, config.isDisabled, config.isLoading)
				]),
			_List_fromArray(
				[
					author$project$Button$Css$spinKeyFrames,
					A4(author$project$Button$content, config.content, config.size, config.color, config.isLoading)
				]));
	} else {
		if (_n1.b.$ === 'Nothing') {
			var _n2 = _n1.b;
			return A2(
				rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						A5(author$project$Button$Css$button, config.size, config.content, config.color, config.isDisabled, config.isLoading),
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!config.isDisabled,
						A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Events$onClick, config.onClick))
					]),
				_List_fromArray(
					[
						author$project$Button$Css$spinKeyFrames,
						A4(author$project$Button$content, config.content, config.size, config.color, config.isLoading)
					]));
		} else {
			var href_ = _n1.b.a;
			return A2(
				rtfeldman$elm_css$Html$Styled$a,
				_List_fromArray(
					[
						A5(author$project$Button$Css$button, config.size, config.content, config.color, config.isDisabled, config.isLoading),
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!config.isDisabled,
						A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Events$onClick, config.onClick)),
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!_Utils_eq(config.href, elm$core$Maybe$Nothing),
						rtfeldman$elm_css$Html$Styled$Attributes$href(href_.url)),
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						href_.blank,
						rtfeldman$elm_css$Html$Styled$Attributes$target('blank_'))
					]),
				_List_fromArray(
					[
						author$project$Button$Css$spinKeyFrames,
						A4(author$project$Button$content, config.content, config.size, config.color, config.isLoading)
					]));
		}
	}
};
var author$project$Button$Size$Small = {$: 'Small'};
var author$project$Button$small = function (_n0) {
	var config = _n0.a;
	return author$project$Button$Button(
		_Utils_update(
			config,
			{size: author$project$Button$Size$Small}));
};
var author$project$Content$Text = function (a) {
	return {$: 'Text', a: a};
};
var author$project$Button$text = F2(
	function (text_, _n0) {
		var config = _n0.a;
		return author$project$Button$Button(
			_Utils_update(
				config,
				{
					content: author$project$Content$Text(text_)
				}));
	});
var author$project$Button$Size$Normal = {$: 'Normal'};
var author$project$Button$initialConfig = {
	color: A3(rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	content: author$project$Content$Text(''),
	href: elm$core$Maybe$Nothing,
	isDisabled: false,
	isLoading: false,
	isShown: true,
	onClick: elm$core$Maybe$Nothing,
	size: author$project$Button$Size$Normal
};
var author$project$Button$view = author$project$Button$Button(author$project$Button$initialConfig);
var author$project$Card$CardBlock = function (a) {
	return {$: 'CardBlock', a: a};
};
var author$project$Card$CardBlockConfig = F3(
	function (defaultCols, sizes, children) {
		return {children: children, defaultCols: defaultCols, sizes: sizes};
	});
var author$project$Card$block = F2(
	function (cols, children) {
		return author$project$Card$CardBlock(
			A3(author$project$Card$CardBlockConfig, cols, _List_Nil, children));
	});
var author$project$Card$Config = function (a) {
	return {$: 'Config', a: a};
};
var author$project$Card$body = F2(
	function (cardBlocks, _n0) {
		var viewConfig = _n0.a;
		return author$project$Card$Config(
			_Utils_update(
				viewConfig,
				{cardBlocks: cardBlocks}));
	});
var author$project$Card$footer = F2(
	function (buttons, _n0) {
		var viewConfig = _n0.a;
		return author$project$Card$Config(
			_Utils_update(
				viewConfig,
				{footerButtons: buttons}));
	});
var author$project$Card$header = F3(
	function (title, buttons, _n0) {
		var viewConfig = _n0.a;
		return author$project$Card$Config(
			_Utils_update(
				viewConfig,
				{headerButtons: buttons, headerTitle: title}));
	});
var author$project$Card$maybeBlock = F3(
	function (cols, maybe, children) {
		if (maybe.$ === 'Nothing') {
			return author$project$Card$CardBlock(
				A3(author$project$Card$CardBlockConfig, cols, _List_Nil, _List_Nil));
		} else {
			var a = maybe.a;
			return author$project$Card$CardBlock(
				A3(
					author$project$Card$CardBlockConfig,
					cols,
					_List_Nil,
					children(a)));
		}
	});
var author$project$Grid$SizeHelpers$breakpointPxWidth = function (size) {
	switch (size.$) {
		case 'Xs':
			return 576;
		case 'Sm':
			return 768;
		case 'Md':
			return 992;
		case 'Lg':
			return 1200;
		default:
			return 1600;
	}
};
var author$project$Grid$SizeHelpers$colsToFloat = function (cols) {
	switch (cols.$) {
		case 'One':
			return 1;
		case 'Two':
			return 2;
		case 'Three':
			return 3;
		case 'Four':
			return 4;
		case 'Five':
			return 5;
		case 'Six':
			return 6;
		case 'Seven':
			return 7;
		case 'Eight':
			return 8;
		case 'Nine':
			return 9;
		case 'Ten':
			return 10;
		case 'Eleven':
			return 11;
		default:
			return 12;
	}
};
var rtfeldman$elm_css$Css$flexBasis = rtfeldman$elm_css$Css$prop1('flex-basis');
var rtfeldman$elm_css$Css$maxWidth = rtfeldman$elm_css$Css$prop1('max-width');
var rtfeldman$elm_css$Css$Structure$AllQuery = function (a) {
	return {$: 'AllQuery', a: a};
};
var rtfeldman$elm_css$Css$Media$all = rtfeldman$elm_css$Css$Structure$AllQuery;
var rtfeldman$elm_css$Css$Media$feature = F2(
	function (key, _n0) {
		var value = _n0.value;
		return {
			feature: key,
			value: elm$core$Maybe$Just(value)
		};
	});
var rtfeldman$elm_css$Css$Media$minWidth = function (value) {
	return A2(rtfeldman$elm_css$Css$Media$feature, 'min-width', value);
};
var rtfeldman$elm_css$Css$Preprocess$WithMedia = F2(
	function (a, b) {
		return {$: 'WithMedia', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Media$withMedia = rtfeldman$elm_css$Css$Preprocess$WithMedia;
var author$project$Grid$Css$colSize = function (_n0) {
	var size = _n0.a;
	var cols = _n0.b;
	return A2(
		rtfeldman$elm_css$Css$Media$withMedia,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Media$all(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$Media$minWidth(
						rtfeldman$elm_css$Css$px(
							author$project$Grid$SizeHelpers$breakpointPxWidth(size)))
					]))
			]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$flexBasis(
				rtfeldman$elm_css$Css$pct(
					(100 / 12) * author$project$Grid$SizeHelpers$colsToFloat(cols))),
				rtfeldman$elm_css$Css$maxWidth(
				rtfeldman$elm_css$Css$pct(
					(100 / 12) * author$project$Grid$SizeHelpers$colsToFloat(cols)))
			]));
};
var author$project$Grid$Css$defaultColSize = function (cols) {
	return A2(
		rtfeldman$elm_css$Css$Media$withMedia,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Media$all(_List_Nil)
			]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$flexBasis(
				rtfeldman$elm_css$Css$pct(
					(100 / 12) * author$project$Grid$SizeHelpers$colsToFloat(cols))),
				rtfeldman$elm_css$Css$maxWidth(
				rtfeldman$elm_css$Css$pct(
					(100 / 12) * author$project$Grid$SizeHelpers$colsToFloat(cols)))
			]));
};
var author$project$Grid$SizeHelpers$containerPxWidth = function (size) {
	switch (size.$) {
		case 'Xs':
			return 540;
		case 'Sm':
			return 720;
		case 'Md':
			return 960;
		case 'Lg':
			return 1140;
		default:
			return 1540;
	}
};
var elm$core$List$sortBy = _List_sortBy;
var author$project$Grid$SizeHelpers$orderBySize = function (sizes) {
	return A2(
		elm$core$List$sortBy,
		A2(elm$core$Basics$composeR, elm$core$Tuple$first, author$project$Grid$SizeHelpers$containerPxWidth),
		sizes);
};
var rtfeldman$elm_css$Css$flexGrow = rtfeldman$elm_css$Css$prop1('flex-grow');
var author$project$Card$Css$block = F2(
	function (cols, sizes) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_Utils_ap(
				A2(
					elm$core$List$map,
					author$project$Grid$Css$colSize,
					author$project$Grid$SizeHelpers$orderBySize(sizes)),
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$flexGrow(
						rtfeldman$elm_css$Css$num(1)),
						A2(
						rtfeldman$elm_css$Css$padding2,
						rtfeldman$elm_css$Css$rem(0.2),
						rtfeldman$elm_css$Css$rem(0.8)),
						rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
						author$project$Grid$Css$defaultColSize(cols)
					])));
	});
var author$project$Html$Styled$Bdt$divIf = F3(
	function (show, attributes, children) {
		if (show) {
			return A2(rtfeldman$elm_css$Html$Styled$div, attributes, children);
		} else {
			return rtfeldman$elm_css$Html$Styled$text('');
		}
	});
var author$project$Card$renderCardBlock = function (_n0) {
	var cardBlockConfig = _n0.a;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		!elm$core$List$isEmpty(cardBlockConfig.children),
		_List_fromArray(
			[
				A2(author$project$Card$Css$block, cardBlockConfig.defaultCols, cardBlockConfig.sizes)
			]),
		cardBlockConfig.children);
};
var rtfeldman$elm_css$Css$flexWrap = rtfeldman$elm_css$Css$prop1('flex-wrap');
var rtfeldman$elm_css$Css$wrap = {flexDirectionOrWrap: rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: rtfeldman$elm_css$Css$Structure$Compatible, value: 'wrap'};
var author$project$Card$Css$body = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$flexWrap(rtfeldman$elm_css$Css$wrap),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$rem(0.8),
			rtfeldman$elm_css$Css$rem(0))
		]));
var author$project$Card$Css$card = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$backgroundColor(
			rtfeldman$elm_css$Css$hex('ffffff')),
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid,
			rtfeldman$elm_css$Css$hex('cccccc')),
			rtfeldman$elm_css$Css$borderRadius(
			rtfeldman$elm_css$Css$px(2)),
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('4f4f4f')),
			rtfeldman$elm_css$Css$marginBottom(
			rtfeldman$elm_css$Css$rem(0.8)),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$rem(0.8),
			rtfeldman$elm_css$Css$rem(0))
		]));
var rtfeldman$elm_css$Css$flexEnd = rtfeldman$elm_css$Css$prop1('flex-end');
var author$project$Card$Css$footer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$flexEnd),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$rem(0),
			rtfeldman$elm_css$Css$rem(0.8))
		]));
var rtfeldman$elm_css$Css$fontWeight = function (_n0) {
	var value = _n0.value;
	return A2(rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var rtfeldman$elm_css$Css$spaceBetween = rtfeldman$elm_css$Css$prop1('space-between');
var author$project$Card$Css$header = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$spaceBetween),
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$rem(0),
			rtfeldman$elm_css$Css$rem(0.8)),
			rtfeldman$elm_css$Css$fontFamilies(
			_List_fromArray(
				['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'])),
			rtfeldman$elm_css$Css$fontSize(
			rtfeldman$elm_css$Css$rem(1.2)),
			rtfeldman$elm_css$Css$fontWeight(
			rtfeldman$elm_css$Css$int(600))
		]));
var rtfeldman$elm_css$Html$Styled$span = rtfeldman$elm_css$Html$Styled$node('span');
var author$project$Card$render = function (_n0) {
	var viewConfig = _n0.a;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		viewConfig.isShown,
		_List_fromArray(
			[author$project$Card$Css$card]),
		_List_fromArray(
			[
				A3(
				author$project$Html$Styled$Bdt$divIf,
				(viewConfig.headerTitle !== '') || (!elm$core$List$isEmpty(viewConfig.headerButtons)),
				_List_fromArray(
					[author$project$Card$Css$header]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$span,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text(viewConfig.headerTitle)
							])),
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						A2(elm$core$List$map, author$project$Button$render, viewConfig.headerButtons))
					])),
				A3(
				author$project$Html$Styled$Bdt$divIf,
				!elm$core$List$isEmpty(viewConfig.cardBlocks),
				_List_fromArray(
					[author$project$Card$Css$body]),
				A2(elm$core$List$map, author$project$Card$renderCardBlock, viewConfig.cardBlocks)),
				A3(
				author$project$Html$Styled$Bdt$divIf,
				!elm$core$List$isEmpty(viewConfig.footerButtons),
				_List_fromArray(
					[author$project$Card$Css$footer]),
				A2(elm$core$List$map, author$project$Button$render, viewConfig.footerButtons))
			]));
};
var author$project$Card$initialViewConfig = function (isShown) {
	return {cardBlocks: _List_Nil, footerButtons: _List_Nil, headerButtons: _List_Nil, headerTitle: '', isShown: isShown};
};
var author$project$Card$view = author$project$Card$Config(
	author$project$Card$initialViewConfig(true));
var author$project$Form$DatePicker$Internal$getSelectedPosix = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.selectedPosix;
	},
	author$project$Resettable$getValue);
var author$project$Form$DatePicker$getSelectedPosix = function (_n0) {
	var state = _n0.a;
	return author$project$Form$DatePicker$Internal$getSelectedPosix(state);
};
var author$project$Form$DatePicker$Css$container = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var rtfeldman$elm_css$Css$ellipsis = {textOverflow: rtfeldman$elm_css$Css$Structure$Compatible, value: 'ellipsis'};
var rtfeldman$elm_css$Css$focus = rtfeldman$elm_css$Css$pseudoClass('focus');
var rtfeldman$elm_css$Css$overflowX = rtfeldman$elm_css$Css$prop1('overflow-x');
var rtfeldman$elm_css$Css$textOverflow = rtfeldman$elm_css$Css$prop1('text-overflow');
var author$project$Form$Css$input = F2(
	function (isError, isLocked) {
		return _List_fromArray(
			[
				rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
				A3(
				rtfeldman$elm_css$Css$border3,
				rtfeldman$elm_css$Css$px(1),
				rtfeldman$elm_css$Css$solid,
				rtfeldman$elm_css$Css$hex(
					(isError && (!isLocked)) ? 'd9534f' : 'cccccc')),
				rtfeldman$elm_css$Css$width(
				rtfeldman$elm_css$Css$pct(100)),
				rtfeldman$elm_css$Css$maxWidth(
				rtfeldman$elm_css$Css$pct(100)),
				rtfeldman$elm_css$Css$height(
				rtfeldman$elm_css$Css$rem(2)),
				A2(
				rtfeldman$elm_css$Css$padding2,
				rtfeldman$elm_css$Css$rem(0),
				rtfeldman$elm_css$Css$rem(0.4)),
				A2(
				rtfeldman$elm_css$Css$margin2,
				rtfeldman$elm_css$Css$rem(0.5),
				rtfeldman$elm_css$Css$rem(0)),
				rtfeldman$elm_css$Css$color(
				rtfeldman$elm_css$Css$hex('555555')),
				rtfeldman$elm_css$Css$backgroundColor(
				rtfeldman$elm_css$Css$hex(
					isLocked ? 'dddddd' : 'ffffff')),
				rtfeldman$elm_css$Css$fontSize(
				rtfeldman$elm_css$Css$rem(0.8)),
				rtfeldman$elm_css$Css$whiteSpace(rtfeldman$elm_css$Css$noWrap),
				rtfeldman$elm_css$Css$textOverflow(rtfeldman$elm_css$Css$ellipsis),
				rtfeldman$elm_css$Css$overflowX(rtfeldman$elm_css$Css$hidden),
				rtfeldman$elm_css$Css$focus(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$outlineWidth(
						rtfeldman$elm_css$Css$rem(0))
					]))
			]);
	});
var author$project$Form$Css$select = F2(
	function (isError, isLocked) {
		return _Utils_ap(
			A2(author$project$Form$Css$input, isError, isLocked),
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$displayFlex,
					rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
					rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
				]));
	});
var author$project$Form$DatePicker$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$select, isError, isLocked));
	});
var rtfeldman$elm_css$Css$indeterminate = rtfeldman$elm_css$Css$pseudoClass('indeterminate');
var author$project$Css$Bdt$styleIf = F2(
	function (bool, style) {
		return bool ? style : rtfeldman$elm_css$Css$indeterminate(_List_Nil);
	});
var author$project$Form$Css$title = function (isFaded) {
	return _List_fromArray(
		[
			rtfeldman$elm_css$Css$flexGrow(
			rtfeldman$elm_css$Css$int(1)),
			A2(
			author$project$Css$Bdt$styleIf,
			isFaded,
			rtfeldman$elm_css$Css$color(
				A3(rtfeldman$elm_css$Css$rgb, 111, 111, 111))),
			A2(
			author$project$Css$Bdt$styleIf,
			isFaded,
			rtfeldman$elm_css$Css$fontWeight(
				rtfeldman$elm_css$Css$int(200))),
			rtfeldman$elm_css$Css$fontFamilies(
			_List_fromArray(
				['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'])),
			rtfeldman$elm_css$Css$whiteSpace(rtfeldman$elm_css$Css$noWrap),
			rtfeldman$elm_css$Css$textOverflow(rtfeldman$elm_css$Css$ellipsis),
			rtfeldman$elm_css$Css$overflowX(rtfeldman$elm_css$Css$hidden),
			rtfeldman$elm_css$Css$maxWidth(
			rtfeldman$elm_css$Css$pct(100))
		]);
};
var author$project$Form$DatePicker$Css$title = function (isFaded) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		author$project$Form$Css$title(isFaded));
};
var author$project$Form$DatePicker$Internal$Open = F3(
	function (a, b, c) {
		return {$: 'Open', a: a, b: b, c: c};
	});
var elm$svg$Svg$line = elm$svg$Svg$trustedNode('line');
var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
var elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var feathericons$elm_feather$FeatherIcons$calendar = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'calendar',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-calendar')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$rect,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x('3'),
							elm$svg$Svg$Attributes$y('4'),
							elm$svg$Svg$Attributes$width('18'),
							elm$svg$Svg$Attributes$height('18'),
							elm$svg$Svg$Attributes$rx('2'),
							elm$svg$Svg$Attributes$ry('2')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('16'),
							elm$svg$Svg$Attributes$y1('2'),
							elm$svg$Svg$Attributes$x2('16'),
							elm$svg$Svg$Attributes$y2('6')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('8'),
							elm$svg$Svg$Attributes$y1('2'),
							elm$svg$Svg$Attributes$x2('8'),
							elm$svg$Svg$Attributes$y2('6')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('3'),
							elm$svg$Svg$Attributes$y1('10'),
							elm$svg$Svg$Attributes$x2('21'),
							elm$svg$Svg$Attributes$y2('10')
						]),
					_List_Nil)
				]))
		]));
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$attribute, key, value),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Attributes$tabindex = function (n) {
	return A2(
		rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'tabIndex',
		elm$core$String$fromInt(n));
};
var rtfeldman$elm_css$Html$Styled$Events$onFocus = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'focus',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Form$DatePicker$Internal$closed = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$DatePicker$Css$container]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2(author$project$Form$DatePicker$Css$input, viewState.isError, viewState.isLocked),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Events$onFocus(
								A3(author$project$Form$DatePicker$Internal$Open, viewState.minPosix, viewState.maxPosix, viewState.includeTime))),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3(author$project$Form$DatePicker$Internal$Open, viewState.minPosix, viewState.maxPosix, viewState.includeTime)))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									author$project$Form$DatePicker$Css$title(
									_Utils_eq(
										author$project$Resettable$getValue(state.selectedPosix),
										elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A2(
										elm$core$Maybe$withDefault,
										viewState.defaultLabel,
										A2(
											elm$core$Maybe$map,
											viewState.toLabel(state.timeZone),
											author$project$Resettable$getValue(state.selectedPosix))))
								])),
							A3(
							author$project$Html$Styled$Bdt$divIf,
							viewState.isInput,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(
										feathericons$elm_feather$FeatherIcons$toHtml,
										_List_Nil,
										A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$calendar)))
								]))
						]))
				]));
	});
var author$project$Form$DatePicker$Internal$Blur = {$: 'Blur'};
var rtfeldman$elm_css$Css$padding = rtfeldman$elm_css$Css$prop1('padding');
var author$project$Form$DatePicker$Css$calendar = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid,
			rtfeldman$elm_css$Css$hex('dddddd')),
			rtfeldman$elm_css$Css$padding(
			rtfeldman$elm_css$Css$px(15)),
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$px(320)),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$px(33)),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
			rtfeldman$elm_css$Css$zIndex(
			rtfeldman$elm_css$Css$int(100)),
			rtfeldman$elm_css$Css$backgroundColor(
			rtfeldman$elm_css$Css$hex('ffffff'))
		]));
var rtfeldman$elm_css$Css$borderWidth2 = rtfeldman$elm_css$Css$prop2('border-width');
var rtfeldman$elm_css$Css$dashed = {borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: rtfeldman$elm_css$Css$Structure$Compatible, value: 'dashed'};
var author$project$Form$DatePicker$Css$weekDayList = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$dashed,
			rtfeldman$elm_css$Css$hex('dddddd')),
			A2(
			rtfeldman$elm_css$Css$borderWidth2,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$px(0)),
			A2(
			rtfeldman$elm_css$Css$margin2,
			rtfeldman$elm_css$Css$px(10),
			rtfeldman$elm_css$Css$px(0)),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$px(5),
			rtfeldman$elm_css$Css$px(0)),
			rtfeldman$elm_css$Css$displayFlex
		]));
var author$project$Form$DatePicker$Helpers$weekDayOnCalendar = function (weekday) {
	switch (weekday.$) {
		case 'Mon':
			return 0;
		case 'Tue':
			return 1;
		case 'Wed':
			return 2;
		case 'Thu':
			return 3;
		case 'Fri':
			return 4;
		case 'Sat':
			return 5;
		default:
			return 6;
	}
};
var elm_community$list_extra$List$Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2(elm$core$List$drop, step, xs);
		var thisGroup = A2(elm$core$List$take, size, xs);
		var okayLength = _Utils_eq(
			size,
			elm$core$List$length(thisGroup));
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayLength) ? A2(
			elm$core$List$cons,
			thisGroup,
			A3(elm_community$list_extra$List$Extra$groupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var elm_community$list_extra$List$Extra$groupsOf = F2(
	function (size, xs) {
		return A3(elm_community$list_extra$List$Extra$groupsOfWithStep, size, size, xs);
	});
var isaacseymour$deprecated_time$Time$Date$month = function (_n0) {
	var inner = _n0.a;
	return isaacseymour$deprecated_time$Time$Date$monthToInt(inner.month);
};
var isaacseymour$deprecated_time$Time$Date$Fri = {$: 'Fri'};
var isaacseymour$deprecated_time$Time$Date$Mon = {$: 'Mon'};
var isaacseymour$deprecated_time$Time$Date$Sat = {$: 'Sat'};
var isaacseymour$deprecated_time$Time$Date$Sun = {$: 'Sun'};
var isaacseymour$deprecated_time$Time$Date$Thu = {$: 'Thu'};
var isaacseymour$deprecated_time$Time$Date$Tue = {$: 'Tue'};
var isaacseymour$deprecated_time$Time$Date$Wed = {$: 'Wed'};
var isaacseymour$deprecated_time$Time$Date$weekday = function (_n0) {
	var inner = _n0.a;
	var y = function () {
		var _n2 = inner.month;
		switch (_n2.$) {
			case 'Jan':
				return inner.year - 1;
			case 'Feb':
				return inner.year - 1;
			default:
				return inner.year;
		}
	}();
	var m = function () {
		var _n1 = inner.month;
		switch (_n1.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 3;
			case 'Mar':
				return 2;
			case 'Apr':
				return 5;
			case 'May':
				return 0;
			case 'Jun':
				return 3;
			case 'Jul':
				return 5;
			case 'Aug':
				return 1;
			case 'Sep':
				return 4;
			case 'Oct':
				return 6;
			case 'Nov':
				return 2;
			default:
				return 4;
		}
	}();
	var d = A2(elm$core$Basics$modBy, 7, ((((y + ((y / 4) | 0)) - ((y / 100) | 0)) + ((y / 400) | 0)) + m) + inner.day);
	return (!d) ? isaacseymour$deprecated_time$Time$Date$Sun : ((d === 1) ? isaacseymour$deprecated_time$Time$Date$Mon : ((d === 2) ? isaacseymour$deprecated_time$Time$Date$Tue : ((d === 3) ? isaacseymour$deprecated_time$Time$Date$Wed : ((d === 4) ? isaacseymour$deprecated_time$Time$Date$Thu : ((d === 5) ? isaacseymour$deprecated_time$Time$Date$Fri : isaacseymour$deprecated_time$Time$Date$Sat)))));
};
var isaacseymour$deprecated_time$Time$Date$year = function (_n0) {
	var inner = _n0.a;
	return inner.year;
};
var isaacseymour$deprecated_time$Time$DateTime$date = function (_n0) {
	var data = _n0.a;
	return data.date;
};
var author$project$Form$DatePicker$Helpers$visibleDays = function (navigationPosix) {
	var date = isaacseymour$deprecated_time$Time$DateTime$date(
		isaacseymour$deprecated_time$Time$DateTime$fromPosix(navigationPosix));
	var daysInMonth = A2(
		isaacseymour$deprecated_time$Time$Date$daysInMonth,
		isaacseymour$deprecated_time$Time$Date$year(date),
		isaacseymour$deprecated_time$Time$Date$month(date));
	var daysInPreviousMonth = function (newDate) {
		return A2(
			isaacseymour$deprecated_time$Time$Date$daysInMonth,
			isaacseymour$deprecated_time$Time$Date$year(newDate),
			isaacseymour$deprecated_time$Time$Date$month(newDate));
	}(
		A2(isaacseymour$deprecated_time$Time$Date$addMonths, 1, date));
	var firstOfMonth = A2(isaacseymour$deprecated_time$Time$Date$setDay, 1, date);
	var startNumber = author$project$Form$DatePicker$Helpers$weekDayOnCalendar(
		isaacseymour$deprecated_time$Time$Date$weekday(firstOfMonth));
	var headOfNextMonth = A2(
		elm$core$List$map,
		function (day) {
			return isaacseymour$deprecated_time$Time$DateTime$toPosix(
				A2(
					isaacseymour$deprecated_time$Time$DateTime$setDay,
					day,
					A2(
						isaacseymour$deprecated_time$Time$DateTime$addMonths,
						1,
						isaacseymour$deprecated_time$Time$DateTime$fromPosix(navigationPosix))));
		},
		A2(elm$core$List$range, 1, ((6 * 7) - startNumber) - daysInMonth));
	var tailOfPreviousMonth = A2(
		elm$core$List$map,
		function (day) {
			return isaacseymour$deprecated_time$Time$DateTime$toPosix(
				A2(
					isaacseymour$deprecated_time$Time$DateTime$setDay,
					day,
					A2(
						isaacseymour$deprecated_time$Time$DateTime$addMonths,
						-1,
						isaacseymour$deprecated_time$Time$DateTime$fromPosix(navigationPosix))));
		},
		A2(
			elm$core$List$drop,
			daysInPreviousMonth - startNumber,
			A2(elm$core$List$range, 1, daysInPreviousMonth)));
	var currentMonth = A2(
		elm$core$List$map,
		function (day) {
			return isaacseymour$deprecated_time$Time$DateTime$toPosix(
				A2(
					isaacseymour$deprecated_time$Time$DateTime$setDay,
					day,
					isaacseymour$deprecated_time$Time$DateTime$fromPosix(navigationPosix)));
		},
		A2(elm$core$List$range, 1, daysInMonth));
	return A2(
		elm_community$list_extra$List$Extra$groupsOf,
		7,
		_Utils_ap(
			tailOfPreviousMonth,
			_Utils_ap(currentMonth, headOfNextMonth)));
};
var author$project$Form$DatePicker$Css$calendarDayRow = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[rtfeldman$elm_css$Css$displayFlex]));
var author$project$Form$DatePicker$Css$calendarDayItemColors = F3(
	function (isSelected, isDesired, isSelectable) {
		var _n0 = _Utils_Tuple3(isSelected, isDesired, isSelectable);
		if (!_n0.c) {
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$backgroundColor(
					rtfeldman$elm_css$Css$hex('fbfbfb')),
					rtfeldman$elm_css$Css$color(
					rtfeldman$elm_css$Css$hex('dddddd'))
				]);
		} else {
			if (_n0.a) {
				return _List_fromArray(
					[
						rtfeldman$elm_css$Css$backgroundColor(
						rtfeldman$elm_css$Css$hex('6bb9f0')),
						rtfeldman$elm_css$Css$color(
						rtfeldman$elm_css$Css$hex('ffffff'))
					]);
			} else {
				if (_n0.b) {
					return _List_fromArray(
						[
							rtfeldman$elm_css$Css$backgroundColor(
							rtfeldman$elm_css$Css$hex('4b77be')),
							rtfeldman$elm_css$Css$color(
							rtfeldman$elm_css$Css$hex('ffffff')),
							rtfeldman$elm_css$Css$hover(
							_List_fromArray(
								[
									rtfeldman$elm_css$Css$backgroundColor(
									rtfeldman$elm_css$Css$hex('6bb9f0')),
									rtfeldman$elm_css$Css$color(
									rtfeldman$elm_css$Css$hex('ffffff'))
								]))
						]);
				} else {
					return _List_fromArray(
						[
							rtfeldman$elm_css$Css$backgroundColor(
							rtfeldman$elm_css$Css$hex('f3f3f3')),
							rtfeldman$elm_css$Css$color(
							rtfeldman$elm_css$Css$hex('666666')),
							rtfeldman$elm_css$Css$hover(
							_List_fromArray(
								[
									rtfeldman$elm_css$Css$backgroundColor(
									rtfeldman$elm_css$Css$hex('6bb9f0')),
									rtfeldman$elm_css$Css$color(
									rtfeldman$elm_css$Css$hex('ffffff'))
								]))
						]);
				}
			}
		}
	});
var rtfeldman$elm_css$Css$margin = rtfeldman$elm_css$Css$prop1('margin');
var author$project$Form$DatePicker$Css$calendarDayItem = F3(
	function (isSelected, isDesired, isSelectable) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_Utils_ap(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$displayFlex,
						rtfeldman$elm_css$Css$flexBasis(
						rtfeldman$elm_css$Css$px(0)),
						rtfeldman$elm_css$Css$flexGrow(
						rtfeldman$elm_css$Css$int(1)),
						rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
						rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
						rtfeldman$elm_css$Css$padding(
						rtfeldman$elm_css$Css$px(8)),
						rtfeldman$elm_css$Css$margin(
						rtfeldman$elm_css$Css$px(3)),
						rtfeldman$elm_css$Css$borderRadius(
						rtfeldman$elm_css$Css$px(2)),
						rtfeldman$elm_css$Css$cursor(
						isSelectable ? rtfeldman$elm_css$Css$pointer : rtfeldman$elm_css$Css$notAllowed)
					]),
				A3(author$project$Form$DatePicker$Css$calendarDayItemColors, isSelected, isDesired, isSelectable)));
	});
var author$project$Form$DatePicker$Internal$SelectDay = F2(
	function (a, b) {
		return {$: 'SelectDay', a: a, b: b};
	});
var author$project$Form$DatePicker$Internal$calendarDay = F4(
	function (state, viewState, navigationPosix, posix) {
		var isSelectedPosix = function () {
			var _n1 = author$project$Resettable$getValue(state.selectedPosix);
			if (_n1.$ === 'Nothing') {
				return false;
			} else {
				var selectedPosix = _n1.a;
				return _Utils_eq(
					elm$time$Time$posixToMillis(posix),
					elm$time$Time$posixToMillis(selectedPosix));
			}
		}();
		var isInRange = function (clamped) {
			return _Utils_eq(
				elm$time$Time$posixToMillis(posix),
				elm$time$Time$posixToMillis(clamped));
		}(
			A3(author$project$Time$Bdt$maybeClamp, viewState.minPosix, viewState.maxPosix, posix));
		var isDesiredPosix = function () {
			var _n0 = state.desiredPosix;
			if (_n0.$ === 'Nothing') {
				return false;
			} else {
				var desiredPosix = _n0.a;
				return _Utils_eq(
					elm$time$Time$posixToMillis(posix),
					elm$time$Time$posixToMillis(desiredPosix));
			}
		}();
		var isCurrentMonth = _Utils_eq(
			A2(elm$time$Time$toYear, state.timeZone, posix),
			A2(elm$time$Time$toYear, state.timeZone, navigationPosix)) && _Utils_eq(
			A2(elm$time$Time$toMonth, state.timeZone, posix),
			A2(elm$time$Time$toMonth, state.timeZone, navigationPosix));
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A3(author$project$Form$DatePicker$Css$calendarDayItem, isSelectedPosix, isDesiredPosix, isCurrentMonth && isInRange),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					isCurrentMonth && isInRange,
					rtfeldman$elm_css$Html$Styled$Events$onClick(
						A2(author$project$Form$DatePicker$Internal$SelectDay, posix, viewState.includeTime)))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					elm$core$String$fromInt(
						A2(elm$time$Time$toDay, state.timeZone, posix)))
				]));
	});
var author$project$Form$DatePicker$Internal$calendarDayRow = F4(
	function (state, viewState, navigationPosix, row) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$DatePicker$Css$calendarDayRow]),
			A2(
				elm$core$List$map,
				A3(author$project$Form$DatePicker$Internal$calendarDay, state, viewState, navigationPosix),
				row));
	});
var author$project$Form$DatePicker$Internal$calendarDays = F3(
	function (state, viewState, navigationPosix) {
		var rows = author$project$Form$DatePicker$Helpers$visibleDays(navigationPosix);
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			A2(
				elm$core$List$map,
				A3(author$project$Form$DatePicker$Internal$calendarDayRow, state, viewState, navigationPosix),
				rows));
	});
var author$project$Form$DatePicker$Css$date = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$flexGrow(
			rtfeldman$elm_css$Css$int(1)),
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
		]));
var author$project$Form$DatePicker$Css$navigation = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[rtfeldman$elm_css$Css$displayFlex]));
var author$project$Time$Bdt$monthString = function (month) {
	switch (month.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var author$project$Form$DatePicker$Internal$calendarNavigationTitle = F2(
	function (timeZone, posix) {
		return elm$core$String$fromInt(
			A2(elm$time$Time$toYear, timeZone, posix)) + (' - ' + author$project$Time$Bdt$monthString(
			A2(elm$time$Time$toMonth, timeZone, posix)));
	});
var author$project$Form$DatePicker$Css$arrowStyles = function (isDisabled) {
	return _List_fromArray(
		[
			rtfeldman$elm_css$Css$cursor(
			isDisabled ? rtfeldman$elm_css$Css$notAllowed : rtfeldman$elm_css$Css$pointer),
			rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$color(
					rtfeldman$elm_css$Css$hex('6bb9f0'))
				]))
		]);
};
var author$project$Form$DatePicker$Css$monthArrows = function (isDisabled) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		author$project$Form$DatePicker$Css$arrowStyles(isDisabled));
};
var author$project$Form$DatePicker$Helpers$isSameMonthAndYear = F3(
	function (timeZone, posix1, mPosix2) {
		if (mPosix2.$ === 'Just') {
			var posix2 = mPosix2.a;
			return _Utils_eq(
				A2(elm$time$Time$toYear, timeZone, posix1),
				A2(elm$time$Time$toYear, timeZone, posix2)) && _Utils_eq(
				A2(elm$time$Time$toMonth, timeZone, posix1),
				A2(elm$time$Time$toMonth, timeZone, posix2));
		} else {
			return false;
		}
	});
var author$project$Form$DatePicker$Internal$NextMonth = {$: 'NextMonth'};
var feathericons$elm_feather$FeatherIcons$chevronRight = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'chevron-right',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-chevron-right')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$polyline,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('9 18 15 12 9 6')
						]),
					_List_Nil)
				]))
		]));
var author$project$Form$DatePicker$Internal$nextMonthArrow = F3(
	function (state, viewState, navigationPosix) {
		var isDisabled = A3(author$project$Form$DatePicker$Helpers$isSameMonthAndYear, state.timeZone, navigationPosix, viewState.maxPosix);
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$DatePicker$Css$monthArrows(isDisabled),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!isDisabled,
					rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Form$DatePicker$Internal$NextMonth))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronRight)))
				]));
	});
var rtfeldman$elm_css$Css$marginRight = rtfeldman$elm_css$Css$prop1('margin-right');
var author$project$Form$DatePicker$Css$offsetYearArrow = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$marginRight(
			rtfeldman$elm_css$Css$px(-12))
		]));
var author$project$Form$DatePicker$Css$yearArrows = function (isDisabled) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		_Utils_ap(
			author$project$Form$DatePicker$Css$arrowStyles(isDisabled),
			_List_fromArray(
				[rtfeldman$elm_css$Css$displayFlex])));
};
var author$project$Form$DatePicker$Internal$NextYear = function (a) {
	return {$: 'NextYear', a: a};
};
var author$project$Form$DatePicker$Internal$nextYearArrow = F3(
	function (state, viewState, navigationPosix) {
		var isDisabled = A3(author$project$Form$DatePicker$Helpers$isSameMonthAndYear, state.timeZone, navigationPosix, viewState.maxPosix);
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$DatePicker$Css$yearArrows(isDisabled),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!isDisabled,
					rtfeldman$elm_css$Html$Styled$Events$onClick(
						author$project$Form$DatePicker$Internal$NextYear(viewState.maxPosix)))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[author$project$Form$DatePicker$Css$offsetYearArrow]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(
								feathericons$elm_feather$FeatherIcons$toHtml,
								_List_Nil,
								A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronRight)))
						])),
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronRight)))
				]));
	});
var author$project$Form$DatePicker$Internal$PreviousMonth = {$: 'PreviousMonth'};
var feathericons$elm_feather$FeatherIcons$chevronLeft = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'chevron-left',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-chevron-left')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$polyline,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('15 18 9 12 15 6')
						]),
					_List_Nil)
				]))
		]));
var author$project$Form$DatePicker$Internal$previousMonthArrow = F3(
	function (state, viewState, navigationPosix) {
		var isDisabled = A3(author$project$Form$DatePicker$Helpers$isSameMonthAndYear, state.timeZone, navigationPosix, viewState.minPosix);
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$DatePicker$Css$monthArrows(isDisabled),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!isDisabled,
					rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Form$DatePicker$Internal$PreviousMonth))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronLeft)))
				]));
	});
var author$project$Form$DatePicker$Internal$PreviousYear = function (a) {
	return {$: 'PreviousYear', a: a};
};
var author$project$Form$DatePicker$Internal$previousYearArrow = F3(
	function (state, viewState, navigationPosix) {
		var isDisabled = A3(author$project$Form$DatePicker$Helpers$isSameMonthAndYear, state.timeZone, navigationPosix, viewState.minPosix);
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$DatePicker$Css$yearArrows(isDisabled),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!isDisabled,
					rtfeldman$elm_css$Html$Styled$Events$onClick(
						author$project$Form$DatePicker$Internal$PreviousYear(viewState.minPosix)))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[author$project$Form$DatePicker$Css$offsetYearArrow]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(
								feathericons$elm_feather$FeatherIcons$toHtml,
								_List_Nil,
								A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronLeft)))
						])),
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronLeft)))
				]));
	});
var author$project$Form$DatePicker$Internal$calendarNavigation = F3(
	function (state, viewState, navigationPosix) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$DatePicker$Css$navigation]),
			_List_fromArray(
				[
					A3(author$project$Form$DatePicker$Internal$previousYearArrow, state, viewState, navigationPosix),
					A3(author$project$Form$DatePicker$Internal$previousMonthArrow, state, viewState, navigationPosix),
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[author$project$Form$DatePicker$Css$date]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(
							A2(author$project$Form$DatePicker$Internal$calendarNavigationTitle, state.timeZone, navigationPosix))
						])),
					A3(author$project$Form$DatePicker$Internal$nextMonthArrow, state, viewState, navigationPosix),
					A3(author$project$Form$DatePicker$Internal$nextYearArrow, state, viewState, navigationPosix)
				]));
	});
var rtfeldman$elm_css$Css$PtUnits = {$: 'PtUnits'};
var rtfeldman$elm_css$Css$pt = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$PtUnits, 'pt');
var rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var rtfeldman$elm_css$Css$textTransform = rtfeldman$elm_css$Css$prop1('text-transform');
var rtfeldman$elm_css$Css$uppercase = {textTransform: rtfeldman$elm_css$Css$Structure$Compatible, value: 'uppercase'};
var author$project$Form$DatePicker$Css$weekDayItem = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$flexGrow(
			rtfeldman$elm_css$Css$int(1)),
			rtfeldman$elm_css$Css$textTransform(rtfeldman$elm_css$Css$uppercase),
			rtfeldman$elm_css$Css$fontWeight(
			rtfeldman$elm_css$Css$int(600)),
			rtfeldman$elm_css$Css$fontSize(
			rtfeldman$elm_css$Css$pt(8)),
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('999999')),
			rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center)
		]));
var author$project$Form$DatePicker$Internal$calendarWeekDay = function (day) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[author$project$Form$DatePicker$Css$weekDayItem]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$text(day)
			]));
};
var rtfeldman$elm_css$Css$borderTopWidth = rtfeldman$elm_css$Css$prop1('border-top-width');
var rtfeldman$elm_css$Css$margin4 = rtfeldman$elm_css$Css$prop4('margin');
var rtfeldman$elm_css$Css$padding4 = rtfeldman$elm_css$Css$prop4('padding');
var author$project$Form$DatePicker$Css$clearButton = function (isActive) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		_List_fromArray(
			[
				A3(
				rtfeldman$elm_css$Css$border3,
				rtfeldman$elm_css$Css$px(0),
				rtfeldman$elm_css$Css$solid,
				rtfeldman$elm_css$Css$hex('dddddd')),
				rtfeldman$elm_css$Css$borderTopWidth(
				rtfeldman$elm_css$Css$px(1)),
				A4(
				rtfeldman$elm_css$Css$margin4,
				rtfeldman$elm_css$Css$px(10),
				rtfeldman$elm_css$Css$px(-15),
				rtfeldman$elm_css$Css$px(-10),
				rtfeldman$elm_css$Css$px(-15)),
				rtfeldman$elm_css$Css$displayFlex,
				A4(
				rtfeldman$elm_css$Css$padding4,
				rtfeldman$elm_css$Css$px(10),
				rtfeldman$elm_css$Css$px(10),
				rtfeldman$elm_css$Css$px(5),
				rtfeldman$elm_css$Css$px(10)),
				rtfeldman$elm_css$Css$flexGrow(
				rtfeldman$elm_css$Css$int(1)),
				rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
				rtfeldman$elm_css$Css$cursor(
				isActive ? rtfeldman$elm_css$Css$pointer : rtfeldman$elm_css$Css$notAllowed),
				rtfeldman$elm_css$Css$color(
				isActive ? rtfeldman$elm_css$Css$hex('444444') : rtfeldman$elm_css$Css$hex('dddddd'))
			]));
};
var author$project$Form$DatePicker$Internal$Clear = {$: 'Clear'};
var author$project$Form$DatePicker$Internal$clearDateButton = function (state) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				author$project$Form$DatePicker$Css$clearButton(
				!_Utils_eq(
					author$project$Resettable$getValue(state.selectedPosix),
					elm$core$Maybe$Nothing)),
				A2(
				author$project$Html$Styled$Bdt$attributeIf,
				!_Utils_eq(
					author$project$Resettable$getValue(state.selectedPosix),
					elm$core$Maybe$Nothing),
				rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Form$DatePicker$Internal$Clear))
			]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$text('clear currently selected date')
			]));
};
var author$project$Html$Styled$Bdt$viewIf = F2(
	function (show, html) {
		if (show) {
			return html;
		} else {
			return rtfeldman$elm_css$Html$Styled$text('');
		}
	});
var author$project$Form$DatePicker$Internal$clearDateContainer = F2(
	function (state, viewState) {
		return A2(
			author$project$Html$Styled$Bdt$viewIf,
			viewState.isClearable,
			author$project$Form$DatePicker$Internal$clearDateButton(state));
	});
var author$project$Form$DatePicker$Internal$NoOp = {$: 'NoOp'};
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var author$project$Form$DatePicker$Internal$disableMouseDown = A2(
	rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
	'mousedown',
	elm$json$Json$Decode$succeed(
		_Utils_Tuple2(author$project$Form$DatePicker$Internal$NoOp, true)));
var author$project$Form$DatePicker$Css$applyButton = function (isActive) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Css$padding2,
				rtfeldman$elm_css$Css$px(8),
				rtfeldman$elm_css$Css$px(15)),
				rtfeldman$elm_css$Css$borderRadius(
				rtfeldman$elm_css$Css$px(2)),
				rtfeldman$elm_css$Css$cursor(
				isActive ? rtfeldman$elm_css$Css$pointer : rtfeldman$elm_css$Css$notAllowed),
				rtfeldman$elm_css$Css$color(
				isActive ? rtfeldman$elm_css$Css$hex('ffffff') : rtfeldman$elm_css$Css$hex('cccccc')),
				rtfeldman$elm_css$Css$backgroundColor(
				isActive ? rtfeldman$elm_css$Css$hex('2ecc71') : rtfeldman$elm_css$Css$hex('ffffff'))
			]));
};
var author$project$Form$DatePicker$Css$applyButtonContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$flexGrow(
			rtfeldman$elm_css$Css$int(1)),
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
		]));
var author$project$Form$DatePicker$Css$colon = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
		]));
var author$project$Form$DatePicker$Css$select = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$px(62))
		]));
var author$project$Form$DatePicker$Css$selectContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
			A2(
			rtfeldman$elm_css$Css$margin2,
			rtfeldman$elm_css$Css$px(3),
			rtfeldman$elm_css$Css$px(5))
		]));
var author$project$Form$DatePicker$Css$timePickerContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(0),
			rtfeldman$elm_css$Css$solid,
			rtfeldman$elm_css$Css$hex('dddddd')),
			rtfeldman$elm_css$Css$borderTopWidth(
			rtfeldman$elm_css$Css$px(1)),
			A4(
			rtfeldman$elm_css$Css$margin4,
			rtfeldman$elm_css$Css$px(10),
			rtfeldman$elm_css$Css$px(-15),
			rtfeldman$elm_css$Css$px(-10),
			rtfeldman$elm_css$Css$px(-15)),
			rtfeldman$elm_css$Css$displayFlex,
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$px(0),
			rtfeldman$elm_css$Css$px(10))
		]));
var author$project$Form$DatePicker$Internal$Apply = {$: 'Apply'};
var author$project$Form$DatePicker$Internal$OpenTimeSelect = function (a) {
	return {$: 'OpenTimeSelect', a: a};
};
var author$project$Form$Select$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$select, isError, isLocked));
	});
var author$project$Form$Select$Css$title = function (isFaded) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		author$project$Form$Css$title(isFaded));
};
var author$project$Form$Select$Internal$Open = {$: 'Open'};
var author$project$Form$Css$clearIcon = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[rtfeldman$elm_css$Css$displayFlex]));
var author$project$Form$Select$Internal$Clear = {$: 'Clear'};
var feathericons$elm_feather$FeatherIcons$x = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'x',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-x')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('18'),
							elm$svg$Svg$Attributes$y1('6'),
							elm$svg$Svg$Attributes$x2('6'),
							elm$svg$Svg$Attributes$y2('18')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('6'),
							elm$svg$Svg$Attributes$y1('6'),
							elm$svg$Svg$Attributes$x2('18'),
							elm$svg$Svg$Attributes$y2('18')
						]),
					_List_Nil)
				]))
		]));
var author$project$Form$Select$Internal$clearButton = F2(
	function (state, viewState) {
		return A3(
			author$project$Html$Styled$Bdt$divIf,
			viewState.isClearable && (!_Utils_eq(
				author$project$Resettable$getValue(state.selectedOption),
				elm$core$Maybe$Nothing)),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'mousedown',
					elm$json$Json$Decode$succeed(
						_Utils_Tuple2(author$project$Form$Select$Internal$Clear, true))),
					author$project$Form$Css$clearIcon
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(feathericons$elm_feather$FeatherIcons$withSize, 14, feathericons$elm_feather$FeatherIcons$x)))
				]));
	});
var feathericons$elm_feather$FeatherIcons$chevronDown = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'chevron-down',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-chevron-down')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$polyline,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('6 9 12 15 18 9')
						]),
					_List_Nil)
				]))
		]));
var elm$json$Json$Encode$bool = _Json_wrap;
var rtfeldman$elm_css$Html$Styled$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var rtfeldman$elm_css$Html$Styled$Attributes$disabled = rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('disabled');
var rtfeldman$elm_css$Html$Styled$Attributes$id = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var rtfeldman$elm_css$Html$Styled$Attributes$title = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('title');
var author$project$Form$Select$Internal$closed = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2(author$project$Form$Select$Css$input, viewState.isError, viewState.isLocked),
							A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.id),
							rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.isLocked),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Events$onFocus(author$project$Form$Select$Internal$Open)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Form$Select$Internal$Open))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$Attributes$title(
									A2(
										elm$core$Maybe$withDefault,
										viewState.defaultLabel,
										A2(
											elm$core$Maybe$map,
											viewState.toLabel,
											author$project$Resettable$getValue(state.selectedOption)))),
									author$project$Form$Select$Css$title(
									_Utils_eq(
										author$project$Resettable$getValue(state.selectedOption),
										elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A2(
										elm$core$Maybe$withDefault,
										viewState.defaultLabel,
										A2(
											elm$core$Maybe$map,
											viewState.toLabel,
											author$project$Resettable$getValue(state.selectedOption))))
								])),
							A2(author$project$Form$Select$Internal$clearButton, state, viewState),
							rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(
								feathericons$elm_feather$FeatherIcons$toHtml,
								_List_Nil,
								A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronDown)))
						]))
				]));
	});
var author$project$Form$Helpers$AlphaNum = function (a) {
	return {$: 'AlphaNum', a: a};
};
var author$project$Form$Helpers$Backspace = {$: 'Backspace'};
var author$project$Form$Helpers$Down = {$: 'Down'};
var author$project$Form$Helpers$Enter = {$: 'Enter'};
var author$project$Form$Helpers$Space = {$: 'Space'};
var author$project$Form$Helpers$Up = {$: 'Up'};
var elm$json$Json$Decode$fail = _Json_fail;
var author$project$Form$Helpers$selectKeyDecoder = function (key) {
	switch (key) {
		case 'ArrowUp':
			return elm$json$Json$Decode$succeed(author$project$Form$Helpers$Up);
		case 'ArrowDown':
			return elm$json$Json$Decode$succeed(author$project$Form$Helpers$Down);
		case 'Enter':
			return elm$json$Json$Decode$succeed(author$project$Form$Helpers$Enter);
		case ' ':
			return elm$json$Json$Decode$succeed(author$project$Form$Helpers$Space);
		case 'Backspace':
			return elm$json$Json$Decode$succeed(author$project$Form$Helpers$Backspace);
		default:
			var alphaNum = key;
			return (A2(
				elm$core$List$all,
				elm$core$Char$isAlphaNum,
				elm$core$String$toList(alphaNum)) && (elm$core$String$length(alphaNum) === 1)) ? elm$json$Json$Decode$succeed(
				author$project$Form$Helpers$AlphaNum(alphaNum)) : elm$json$Json$Decode$fail('Not valid SelectKey');
	}
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var author$project$Form$Helpers$onSelectKey = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
		'keydown',
		A2(
			elm$json$Json$Decode$map,
			function (decoder) {
				return _Utils_Tuple2(
					msg(decoder),
					true);
			},
			A2(
				elm$json$Json$Decode$andThen,
				author$project$Form$Helpers$selectKeyDecoder,
				A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string))));
};
var author$project$Form$Select$Css$container = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var author$project$Form$Select$Internal$Blur = {$: 'Blur'};
var author$project$Form$Select$Internal$SelectKey = F3(
	function (a, b, c) {
		return {$: 'SelectKey', a: a, b: b, c: c};
	});
var author$project$Form$Select$Internal$inputContents = F2(
	function (state, viewState) {
		return elm$core$String$isEmpty(state.searchText) ? A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$title(
					A2(
						elm$core$Maybe$withDefault,
						viewState.defaultLabel,
						A2(
							elm$core$Maybe$map,
							viewState.toLabel,
							author$project$Resettable$getValue(state.selectedOption)))),
					author$project$Form$Select$Css$title(
					_Utils_eq(
						author$project$Resettable$getValue(state.selectedOption),
						elm$core$Maybe$Nothing))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					A2(
						elm$core$Maybe$withDefault,
						viewState.defaultLabel,
						A2(
							elm$core$Maybe$map,
							viewState.toLabel,
							author$project$Resettable$getValue(state.selectedOption))))
				])) : rtfeldman$elm_css$Html$Styled$text(state.searchText);
	});
var author$project$Form$Css$selectOptionItem = F2(
	function (isDisabled, isFocused) {
		return _List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Css$padding2,
				rtfeldman$elm_css$Css$rem(0),
				rtfeldman$elm_css$Css$rem(0.4)),
				rtfeldman$elm_css$Css$margin(
				rtfeldman$elm_css$Css$px(0)),
				rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
				rtfeldman$elm_css$Css$height(
				rtfeldman$elm_css$Css$rem(2)),
				rtfeldman$elm_css$Css$displayFlex,
				rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
				A2(
				author$project$Css$Bdt$styleIf,
				isFocused,
				rtfeldman$elm_css$Css$backgroundColor(
					rtfeldman$elm_css$Css$hex('f2f9fc'))),
				A2(
				author$project$Css$Bdt$styleIf,
				isDisabled,
				rtfeldman$elm_css$Css$backgroundColor(
					rtfeldman$elm_css$Css$hex('eeeeee'))),
				rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
				A2(
				author$project$Css$Bdt$styleIf,
				isDisabled,
				rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$notAllowed)),
				rtfeldman$elm_css$Css$outlineWidth(
				rtfeldman$elm_css$Css$px(0)),
				rtfeldman$elm_css$Css$overflowX(rtfeldman$elm_css$Css$hidden),
				rtfeldman$elm_css$Css$whiteSpace(rtfeldman$elm_css$Css$noWrap),
				rtfeldman$elm_css$Css$textOverflow(rtfeldman$elm_css$Css$ellipsis),
				rtfeldman$elm_css$Css$maxWidth(
				rtfeldman$elm_css$Css$pct(100)),
				rtfeldman$elm_css$Css$hover(
				_List_fromArray(
					[
						A2(
						author$project$Css$Bdt$styleIf,
						!isDisabled,
						rtfeldman$elm_css$Css$backgroundColor(
							rtfeldman$elm_css$Css$hex('f2f9fc')))
					]))
			]);
	});
var author$project$Form$Select$Css$optionItem = F2(
	function (isDisabled, isFocused) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$selectOptionItem, isDisabled, isFocused));
	});
var rtfeldman$elm_css$Css$borderTopColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'border-top-color', c.value);
};
var rtfeldman$elm_css$Css$left = rtfeldman$elm_css$Css$prop1('left');
var rtfeldman$elm_css$Css$maxHeight = rtfeldman$elm_css$Css$prop1('max-height');
var rtfeldman$elm_css$Css$overflowY = rtfeldman$elm_css$Css$prop1('overflow-y');
var author$project$Form$Css$selectOptionList = _List_fromArray(
	[
		rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
		rtfeldman$elm_css$Css$top(
		rtfeldman$elm_css$Css$px(31)),
		rtfeldman$elm_css$Css$left(
		rtfeldman$elm_css$Css$px(0)),
		rtfeldman$elm_css$Css$right(
		rtfeldman$elm_css$Css$px(0)),
		rtfeldman$elm_css$Css$zIndex(
		rtfeldman$elm_css$Css$int(10)),
		rtfeldman$elm_css$Css$maxHeight(
		rtfeldman$elm_css$Css$px(200)),
		rtfeldman$elm_css$Css$overflowY(rtfeldman$elm_css$Css$auto),
		A3(
		rtfeldman$elm_css$Css$border3,
		rtfeldman$elm_css$Css$px(1),
		rtfeldman$elm_css$Css$solid,
		rtfeldman$elm_css$Css$hex('cccccc')),
		rtfeldman$elm_css$Css$borderTopColor(
		rtfeldman$elm_css$Css$hex('eeeeee')),
		rtfeldman$elm_css$Css$padding(
		rtfeldman$elm_css$Css$px(0)),
		rtfeldman$elm_css$Css$backgroundColor(
		rtfeldman$elm_css$Css$hex('ffffff'))
	]);
var author$project$Form$Select$Css$optionList = rtfeldman$elm_css$Html$Styled$Attributes$css(author$project$Form$Css$selectOptionList);
var author$project$Form$Select$Internal$NoOp = {$: 'NoOp'};
var author$project$Form$Select$Internal$Select = function (a) {
	return {$: 'Select', a: a};
};
var author$project$Form$Select$Internal$optionItem = F3(
	function (state, viewState, option) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A2(
					author$project$Form$Select$Css$optionItem,
					viewState.isOptionDisabled(option),
					_Utils_eq(
						state.focusedOption,
						elm$core$Maybe$Just(option))),
					rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
					A2(
					rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'mousedown',
					elm$json$Json$Decode$succeed(
						_Utils_Tuple2(
							viewState.isOptionDisabled(option) ? author$project$Form$Select$Internal$NoOp : author$project$Form$Select$Internal$Select(option),
							true)))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					viewState.toLabel(option))
				]));
	});
var author$project$Form$Select$Internal$optionList = F2(
	function (state, viewState) {
		var filteredOptions = A3(
			author$project$Form$Select$Internal$filterOptions,
			state.searchText,
			viewState.toLabel,
			mgold$elm_nonempty_list$List$Nonempty$toList(state.options));
		return elm$core$List$isEmpty(filteredOptions) ? A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$Select$Css$optionList]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2(author$project$Form$Select$Css$optionItem, false, false),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1)
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text('No options containing - \"' + (state.searchText + '\"'))
						]))
				])) : A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$Select$Css$optionList]),
			A2(
				elm$core$List$map,
				A2(author$project$Form$Select$Internal$optionItem, state, viewState),
				filteredOptions));
	});
var rtfeldman$elm_css$Html$Styled$Events$onBlur = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'blur',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Form$Select$Internal$open = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$Select$Css$container]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2(author$project$Form$Select$Css$input, viewState.isError, viewState.isLocked),
							A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.id),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
							author$project$Form$Helpers$onSelectKey(
							A2(author$project$Form$Select$Internal$SelectKey, viewState.isOptionDisabled, viewState.toLabel)),
							rtfeldman$elm_css$Html$Styled$Events$onBlur(author$project$Form$Select$Internal$Blur)
						]),
					_List_fromArray(
						[
							A2(author$project$Form$Select$Internal$inputContents, state, viewState)
						])),
					A2(author$project$Form$Select$Internal$optionList, state, viewState)
				]));
	});
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_n0, styles) {
		var newStyles = _n0.b;
		var classname = _n0.c;
		return elm$core$List$isEmpty(newStyles) ? styles : A3(elm$core$Dict$insert, classname, newStyles, styles);
	});
var rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_n0) {
	var val = _n0.a;
	return val;
};
var rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_n6, _n7) {
		var key = _n6.a;
		var html = _n6.b;
		var pairs = _n7.a;
		var styles = _n7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n9 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n9.a;
				var finalStyles = _n9.b;
				var vdom = A3(
					elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n10 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n10.a;
				var finalStyles = _n10.b;
				var vdom = A4(
					elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n11 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n11.a;
				var finalStyles = _n11.b;
				var vdom = A3(
					elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n12 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n12.a;
				var finalStyles = _n12.b;
				var vdom = A4(
					elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _n0) {
		var nodes = _n0.a;
		var styles = _n0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n2 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n2.a;
				var finalStyles = _n2.b;
				var vdomNode = A3(
					elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n3 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n3.a;
				var finalStyles = _n3.b;
				var vdomNode = A4(
					elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n4 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n4.a;
				var finalStyles = _n4.b;
				var vdomNode = A3(
					elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n5 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n5.a;
				var finalStyles = _n5.b;
				var vdomNode = A4(
					elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
	});
var rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
	function (candidate, properties) {
		stylesFromPropertiesHelp:
		while (true) {
			if (!properties.b) {
				return candidate;
			} else {
				var _n1 = properties.a;
				var styles = _n1.b;
				var classname = _n1.c;
				var rest = properties.b;
				if (elm$core$String$isEmpty(classname)) {
					var $temp$candidate = candidate,
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				} else {
					var $temp$candidate = elm$core$Maybe$Just(
						_Utils_Tuple2(classname, styles)),
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
	var _n0 = A2(rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, elm$core$Maybe$Nothing, properties);
	if (_n0.$ === 'Nothing') {
		return elm$core$Dict$empty;
	} else {
		var _n1 = _n0.a;
		var classname = _n1.a;
		var styles = _n1.b;
		return A2(elm$core$Dict$singleton, classname, styles);
	}
};
var rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_n0) {
	var classname = _n0.a;
	var styles = _n0.b;
	return A2(
		rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
				])));
};
var rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
		elm$core$List$singleton(
			rtfeldman$elm_css$Css$Preprocess$stylesheet(
				A2(
					elm$core$List$map,
					rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
					elm$core$Dict$toList(dict)))));
};
var rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
	return A3(
		elm$virtual_dom$VirtualDom$node,
		'style',
		_List_Nil,
		elm$core$List$singleton(
			elm$virtual_dom$VirtualDom$text(
				rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
};
var rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
	function (elemType, properties, children) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _n0.a;
		var styles = _n0.b;
		var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A3(
			elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				styleNode,
				elm$core$List$reverse(childNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _n1 = pairs.a;
				var str = _n1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _n1 = pairs.a;
				var firstKey = _n1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2(rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
	function (allStyles, keyedChildNodes) {
		var styleNodeKey = A2(rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
	function (elemType, properties, keyedChildren) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _n0.a;
		var styles = _n0.b;
		var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A3(
			elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				keyedStyleNode,
				elm$core$List$reverse(keyedChildNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
	function (ns, elemType, properties, keyedChildren) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _n0.a;
		var styles = _n0.b;
		var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A4(
			elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				keyedStyleNode,
				elm$core$List$reverse(keyedChildNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
	function (ns, elemType, properties, children) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _n0.a;
		var styles = _n0.b;
		var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A4(
			elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				styleNode,
				elm$core$List$reverse(childNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
	}
};
var rtfeldman$elm_css$VirtualDom$Styled$lazyHelp2 = F3(
	function (fn, arg1, arg2) {
		return rtfeldman$elm_css$VirtualDom$Styled$toUnstyled(
			A2(fn, arg1, arg2));
	});
var rtfeldman$elm_css$VirtualDom$Styled$lazy2 = F3(
	function (fn, arg1, arg2) {
		return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
			A4(elm$virtual_dom$VirtualDom$lazy3, rtfeldman$elm_css$VirtualDom$Styled$lazyHelp2, fn, arg1, arg2));
	});
var rtfeldman$elm_css$Html$Styled$Lazy$lazy2 = rtfeldman$elm_css$VirtualDom$Styled$lazy2;
var author$project$Form$Select$Internal$render = F2(
	function (state, viewState) {
		var _n0 = state.isOpen;
		if (!_n0) {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$Select$Internal$closed, state, viewState);
		} else {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$Select$Internal$open, state, viewState);
		}
	});
var author$project$Form$Select$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$Select$Internal$render, state, viewState);
};
var author$project$Form$Select$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$Form$Select$Internal$setId = F2(
	function (id, viewState) {
		return _Utils_update(
			viewState,
			{
				id: elm$core$Maybe$Just(id)
			});
	});
var author$project$Form$Select$setId = F2(
	function (id, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$Select$View,
			state,
			A2(author$project$Form$Select$Internal$setId, id, viewState));
	});
var author$project$Form$Select$Internal$initialViewState = function (toLabel) {
	return {
		defaultLabel: '-- Nothing Selected --',
		id: elm$core$Maybe$Nothing,
		isClearable: false,
		isError: false,
		isLocked: false,
		isOptionDisabled: elm$core$Basics$always(false),
		toLabel: toLabel
	};
};
var author$project$Form$Select$view = F2(
	function (toLabel, _n0) {
		var state = _n0.a;
		return A2(
			author$project$Form$Select$View,
			state,
			author$project$Form$Select$Internal$initialViewState(toLabel));
	});
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var rtfeldman$elm_css$Html$Styled$Events$onMouseDown = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'mousedown',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Form$DatePicker$Internal$timePicker = function (state) {
	var isDesiredDateSelected = !_Utils_eq(state.desiredPosix, elm$core$Maybe$Nothing);
	var isDateSelected = !_Utils_eq(
		author$project$Resettable$getValue(state.selectedPosix),
		elm$core$Maybe$Nothing);
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[author$project$Form$DatePicker$Css$timePickerContainer]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Form$DatePicker$Css$selectContainer,
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!_Utils_eq(
							state.focusedSelect,
							elm$core$Maybe$Just(author$project$Form$DatePicker$Internal$Hours)),
						rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
							author$project$Form$DatePicker$Internal$OpenTimeSelect(author$project$Form$DatePicker$Internal$Hours)))
					]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[author$project$Form$DatePicker$Css$select]),
						_List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$map,
								author$project$Form$DatePicker$Internal$UpdateHours,
								author$project$Form$Select$render(
									A2(
										author$project$Form$Select$setId,
										'FORM_DATEPICKER_HOURS',
										A2(
											author$project$Form$Select$view,
											A2(
												elm$core$Basics$composeR,
												elm$core$String$fromInt,
												A2(
													elm$core$String$padLeft,
													2,
													_Utils_chr('0'))),
											state.hours))))
							]))
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[author$project$Form$DatePicker$Css$colon]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text(':')
							]))
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Form$DatePicker$Css$selectContainer,
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!_Utils_eq(
							state.focusedSelect,
							elm$core$Maybe$Just(author$project$Form$DatePicker$Internal$Minutes)),
						rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
							author$project$Form$DatePicker$Internal$OpenTimeSelect(author$project$Form$DatePicker$Internal$Minutes)))
					]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[author$project$Form$DatePicker$Css$select]),
						_List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$map,
								author$project$Form$DatePicker$Internal$UpdateMinutes,
								author$project$Form$Select$render(
									A2(
										author$project$Form$Select$setId,
										'FORM_DATEPICKER_MINUTES',
										A2(
											author$project$Form$Select$view,
											A2(
												elm$core$Basics$composeR,
												elm$core$String$fromInt,
												A2(
													elm$core$String$padLeft,
													2,
													_Utils_chr('0'))),
											state.minutes))))
							]))
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[author$project$Form$DatePicker$Css$colon]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text(':')
							]))
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Form$DatePicker$Css$selectContainer,
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!_Utils_eq(
							state.focusedSelect,
							elm$core$Maybe$Just(author$project$Form$DatePicker$Internal$Seconds)),
						rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
							author$project$Form$DatePicker$Internal$OpenTimeSelect(author$project$Form$DatePicker$Internal$Seconds)))
					]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[author$project$Form$DatePicker$Css$select]),
						_List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$map,
								author$project$Form$DatePicker$Internal$UpdateSeconds,
								author$project$Form$Select$render(
									A2(
										author$project$Form$Select$setId,
										'FORM_DATEPICKER_SECONDS',
										A2(
											author$project$Form$Select$view,
											A2(
												elm$core$Basics$composeR,
												elm$core$String$fromInt,
												A2(
													elm$core$String$padLeft,
													2,
													_Utils_chr('0'))),
											state.seconds))))
							]))
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[author$project$Form$DatePicker$Css$applyButtonContainer]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								author$project$Form$DatePicker$Css$applyButton(isDesiredDateSelected || isDateSelected),
								A2(
								author$project$Html$Styled$Bdt$attributeIf,
								isDesiredDateSelected || isDateSelected,
								rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Form$DatePicker$Internal$Apply))
							]),
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text('Apply')
							]))
					]))
			]));
};
var author$project$Form$DatePicker$Internal$timePickerContainer = F2(
	function (state, includeTime) {
		return A2(
			author$project$Html$Styled$Bdt$viewIf,
			includeTime,
			author$project$Form$DatePicker$Internal$timePicker(state));
	});
var author$project$Form$DatePicker$Internal$calendar = F2(
	function (state, viewState) {
		var _n0 = state.navigationPosix;
		if (_n0.$ === 'Nothing') {
			return rtfeldman$elm_css$Html$Styled$text('');
		} else {
			var posix = _n0.a;
			return A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Form$DatePicker$Css$calendar,
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						_Utils_eq(state.focusedSelect, elm$core$Maybe$Nothing),
						author$project$Form$DatePicker$Internal$disableMouseDown)
					]),
				_List_fromArray(
					[
						A3(author$project$Form$DatePicker$Internal$calendarNavigation, state, viewState, posix),
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[author$project$Form$DatePicker$Css$weekDayList]),
						A2(
							elm$core$List$map,
							author$project$Form$DatePicker$Internal$calendarWeekDay,
							_List_fromArray(
								['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']))),
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								A3(author$project$Form$DatePicker$Internal$calendarDays, state, viewState, posix)
							])),
						A2(author$project$Form$DatePicker$Internal$timePickerContainer, state, viewState.includeTime),
						A2(author$project$Form$DatePicker$Internal$clearDateContainer, state, viewState)
					]));
		}
	});
var author$project$Form$DatePicker$Internal$open = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$DatePicker$Css$container]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2(author$project$Form$DatePicker$Css$input, viewState.isLocked, viewState.isError),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0),
							rtfeldman$elm_css$Html$Styled$Attributes$id('FORM_DATEPICKER'),
							rtfeldman$elm_css$Html$Styled$Events$onBlur(author$project$Form$DatePicker$Internal$Blur)
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									author$project$Form$DatePicker$Css$title(
									_Utils_eq(
										author$project$Resettable$getValue(state.selectedPosix),
										elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A2(
										elm$core$Maybe$withDefault,
										viewState.defaultLabel,
										A2(
											elm$core$Maybe$map,
											viewState.toLabel(state.timeZone),
											author$project$Resettable$getValue(state.selectedPosix))))
								])),
							A3(
							author$project$Html$Styled$Bdt$divIf,
							viewState.isInput,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(
										feathericons$elm_feather$FeatherIcons$toHtml,
										_List_Nil,
										A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$calendar)))
								]))
						])),
					A2(author$project$Form$DatePicker$Internal$calendar, state, viewState)
				]));
	});
var author$project$Form$DatePicker$Internal$render = F2(
	function (state, viewState) {
		var _n0 = state.isOpen;
		if (!_n0) {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$DatePicker$Internal$closed, state, viewState);
		} else {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$DatePicker$Internal$open, state, viewState);
		}
	});
var author$project$Form$DatePicker$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$DatePicker$Internal$render, state, viewState);
};
var author$project$Form$DatePicker$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var elm$core$String$pad = F3(
	function (n, _char, string) {
		var half = (n - elm$core$String$length(string)) / 2;
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				elm$core$Basics$ceiling(half),
				elm$core$String$fromChar(_char)),
			_Utils_ap(
				string,
				A2(
					elm$core$String$repeat,
					elm$core$Basics$floor(half),
					elm$core$String$fromChar(_char))));
	});
var author$project$Time$Bdt$toDateString = F2(
	function (zone, posix) {
		var year = elm$core$String$fromInt(
			A2(elm$time$Time$toYear, zone, posix));
		var month = A3(
			elm$core$String$pad,
			2,
			_Utils_chr('0'),
			elm$core$String$fromInt(
				author$project$Time$Bdt$monthNumber(
					A2(elm$time$Time$toMonth, zone, posix))));
		var day = A3(
			elm$core$String$pad,
			2,
			_Utils_chr('0'),
			elm$core$String$fromInt(
				A2(elm$time$Time$toDay, zone, posix)));
		return A2(
			elm$core$String$join,
			'/',
			_List_fromArray(
				[day, month, year]));
	});
var author$project$Time$Bdt$toTimeString = F2(
	function (zone, posix) {
		var second = A3(
			elm$core$String$pad,
			2,
			_Utils_chr('0'),
			elm$core$String$fromInt(
				A2(elm$time$Time$toSecond, zone, posix)));
		var minute = A3(
			elm$core$String$pad,
			2,
			_Utils_chr('0'),
			elm$core$String$fromInt(
				A2(elm$time$Time$toMinute, zone, posix)));
		var hour = A3(
			elm$core$String$pad,
			2,
			_Utils_chr('0'),
			elm$core$String$fromInt(
				A2(elm$time$Time$toHour, zone, posix)));
		return A2(
			elm$core$String$join,
			':',
			_List_fromArray(
				[hour, minute, second]));
	});
var author$project$Time$Bdt$toDateTimeString = F2(
	function (zone, posix) {
		return A2(author$project$Time$Bdt$toDateString, zone, posix) + (' ' + A2(author$project$Time$Bdt$toTimeString, zone, posix));
	});
var author$project$Form$DatePicker$Internal$setIncludeTime = F2(
	function (includeTime, viewState) {
		if (includeTime) {
			return _Utils_update(
				viewState,
				{includeTime: true, toLabel: author$project$Time$Bdt$toDateTimeString});
		} else {
			return _Utils_update(
				viewState,
				{includeTime: false, toLabel: author$project$Time$Bdt$toDateString});
		}
	});
var author$project$Form$DatePicker$setIncludeTime = F2(
	function (includeTime, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$DatePicker$View,
			state,
			A2(author$project$Form$DatePicker$Internal$setIncludeTime, includeTime, viewState));
	});
var author$project$Form$DatePicker$Internal$setIsClearable = F2(
	function (isClearable, viewState) {
		return _Utils_update(
			viewState,
			{isClearable: isClearable});
	});
var author$project$Form$DatePicker$setIsClearable = F2(
	function (isClearable, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$DatePicker$View,
			state,
			A2(author$project$Form$DatePicker$Internal$setIsClearable, isClearable, viewState));
	});
var author$project$Form$DatePicker$Internal$setMaxPosix = F2(
	function (posix, viewState) {
		return _Utils_update(
			viewState,
			{maxPosix: posix});
	});
var author$project$Form$DatePicker$setMaxPosix = F2(
	function (posix, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$DatePicker$View,
			state,
			A2(author$project$Form$DatePicker$Internal$setMaxPosix, posix, viewState));
	});
var author$project$Form$DatePicker$Internal$setMinPosix = F2(
	function (posix, viewState) {
		return _Utils_update(
			viewState,
			{minPosix: posix});
	});
var author$project$Form$DatePicker$setMinPosix = F2(
	function (posix, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$DatePicker$View,
			state,
			A2(author$project$Form$DatePicker$Internal$setMinPosix, posix, viewState));
	});
var author$project$Form$DatePicker$Internal$initialViewState = {defaultLabel: '-- Nothing Selected --', id: elm$core$Maybe$Nothing, includeTime: false, isClearable: false, isError: false, isInput: true, isLocked: false, maxPosix: elm$core$Maybe$Nothing, minPosix: elm$core$Maybe$Nothing, toLabel: author$project$Time$Bdt$toDateString};
var author$project$Form$DatePicker$view = function (_n0) {
	var state = _n0.a;
	return A2(author$project$Form$DatePicker$View, state, author$project$Form$DatePicker$Internal$initialViewState);
};
var author$project$Form$FloatInput$Internal$getValue = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.value;
	},
	A2(elm$core$Basics$composeR, author$project$Resettable$getValue, elm$core$String$toFloat));
var author$project$Form$FloatInput$getValue = function (_n0) {
	var state = _n0.a;
	return author$project$Form$FloatInput$Internal$getValue(state);
};
var author$project$Form$FloatInput$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$input, isError, isLocked));
	});
var author$project$Form$FloatInput$Internal$Input = function (a) {
	return {$: 'Input', a: a};
};
var rtfeldman$elm_css$Html$Styled$input = rtfeldman$elm_css$Html$Styled$node('input');
var rtfeldman$elm_css$Html$Styled$Attributes$maxlength = function (n) {
	return A2(
		rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'maxlength',
		elm$core$String$fromInt(n));
};
var rtfeldman$elm_css$Html$Styled$Attributes$placeholder = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('placeholder');
var rtfeldman$elm_css$Html$Styled$Attributes$value = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, rtfeldman$elm_css$Html$Styled$Events$targetValue)));
};
var author$project$Form$FloatInput$Internal$inputField = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$input,
			_List_fromArray(
				[
					A2(author$project$Form$FloatInput$Css$input, viewState.isError, viewState.isLocked),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.isLocked),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.value)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(author$project$Form$FloatInput$Internal$Input),
					rtfeldman$elm_css$Html$Styled$Attributes$placeholder(viewState.placeholder),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.maxLength),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.id)
				]),
			_List_Nil);
	});
var author$project$Form$FloatInput$Internal$render = F2(
	function (state, viewState) {
		return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$FloatInput$Internal$inputField, state, viewState);
	});
var author$project$Form$FloatInput$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$FloatInput$Internal$render, state, viewState);
};
var author$project$Form$FloatInput$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$Form$FloatInput$Internal$initialViewState = {id: elm$core$Maybe$Nothing, isError: false, isLocked: false, maxLength: elm$core$Maybe$Nothing, placeholder: ''};
var author$project$Form$FloatInput$view = function (_n0) {
	var state = _n0.a;
	return A2(author$project$Form$FloatInput$View, state, author$project$Form$FloatInput$Internal$initialViewState);
};
var author$project$Form$Input$Internal$getValue = function (state) {
	return author$project$Resettable$getValue(state.value);
};
var author$project$Form$Input$getValue = function (_n0) {
	var state = _n0.a;
	return author$project$Form$Input$Internal$getValue(state);
};
var author$project$Form$Input$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$input, isError, isLocked));
	});
var author$project$Form$Input$Internal$Input = function (a) {
	return {$: 'Input', a: a};
};
var author$project$Form$Input$Internal$typeToString = function (inputType) {
	switch (inputType.$) {
		case 'Text':
			return 'text';
		case 'Email':
			return 'email';
		case 'Password':
			return 'password';
		case 'Tel':
			return 'tel';
		default:
			return 'number';
	}
};
var rtfeldman$elm_css$Html$Styled$Attributes$type_ = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('type');
var author$project$Form$Input$Internal$inputField = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$input,
			_List_fromArray(
				[
					A2(author$project$Form$Input$Css$input, viewState.isError, viewState.isLocked),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.isLocked),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.value)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(author$project$Form$Input$Internal$Input),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$placeholder, viewState.placeholder),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.maxLength),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.id),
					rtfeldman$elm_css$Html$Styled$Attributes$type_(
					author$project$Form$Input$Internal$typeToString(viewState.inputType))
				]),
			_List_Nil);
	});
var author$project$Form$Input$Internal$render = F2(
	function (state, viewState) {
		return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$Input$Internal$inputField, state, viewState);
	});
var author$project$Form$Input$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$Input$Internal$render, state, viewState);
};
var author$project$Form$Input$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$Form$Input$Internal$Text = {$: 'Text'};
var author$project$Form$Input$Internal$initialViewState = {id: elm$core$Maybe$Nothing, inputType: author$project$Form$Input$Internal$Text, isError: false, isLocked: false, maxLength: elm$core$Maybe$Nothing, placeholder: elm$core$Maybe$Nothing};
var author$project$Form$Input$view = function (_n0) {
	var state = _n0.a;
	return A2(author$project$Form$Input$View, state, author$project$Form$Input$Internal$initialViewState);
};
var author$project$Form$IntInput$Internal$getValue = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.value;
	},
	A2(elm$core$Basics$composeR, author$project$Resettable$getValue, elm$core$String$toInt));
var author$project$Form$IntInput$getValue = function (_n0) {
	var state = _n0.a;
	return author$project$Form$IntInput$Internal$getValue(state);
};
var author$project$Form$IntInput$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$input, isError, isLocked));
	});
var author$project$Form$IntInput$Internal$Input = function (a) {
	return {$: 'Input', a: a};
};
var author$project$Form$IntInput$Internal$inputField = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$input,
			_List_fromArray(
				[
					A2(author$project$Form$IntInput$Css$input, viewState.isError, viewState.isLocked),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.isLocked),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.value)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(author$project$Form$IntInput$Internal$Input),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$placeholder, viewState.placeholder),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.maxLength),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.id)
				]),
			_List_Nil);
	});
var author$project$Form$IntInput$Internal$render = F2(
	function (state, viewState) {
		return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$IntInput$Internal$inputField, state, viewState);
	});
var author$project$Form$IntInput$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$IntInput$Internal$render, state, viewState);
};
var author$project$Form$IntInput$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$Form$IntInput$Internal$initialViewState = {id: elm$core$Maybe$Nothing, isError: false, isLocked: false, maxLength: elm$core$Maybe$Nothing, placeholder: elm$core$Maybe$Nothing};
var author$project$Form$IntInput$view = function (_n0) {
	var state = _n0.a;
	return A2(author$project$Form$IntInput$View, state, author$project$Form$IntInput$Internal$initialViewState);
};
var author$project$Form$Label$Label = function (a) {
	return {$: 'Label', a: a};
};
var author$project$Form$Label$mandatory = F2(
	function (bool, _n0) {
		var config = _n0.a;
		return author$project$Form$Label$Label(
			_Utils_update(
				config,
				{mandatory: bool}));
	});
var author$project$Form$Label$Css$label = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$fontFamilies(
			_List_fromArray(
				['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'])),
			rtfeldman$elm_css$Css$fontWeight(
			rtfeldman$elm_css$Css$int(100)),
			rtfeldman$elm_css$Css$color(
			A3(rtfeldman$elm_css$Css$rgb, 111, 111, 111))
		]));
var author$project$Form$Label$Css$mandatory = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$color(
			A3(rtfeldman$elm_css$Css$rgb, 189, 54, 47)),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineFlex),
			rtfeldman$elm_css$Css$marginLeft(
			rtfeldman$elm_css$Css$px(5))
		]));
var rtfeldman$elm_css$Html$Styled$label = rtfeldman$elm_css$Html$Styled$node('label');
var author$project$Form$Label$render = function (_n0) {
	var config = _n0.a;
	return A2(
		rtfeldman$elm_css$Html$Styled$label,
		_List_fromArray(
			[author$project$Form$Label$Css$label]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$text(config.text),
				A3(
				author$project$Html$Styled$Bdt$divIf,
				config.mandatory,
				_List_fromArray(
					[author$project$Form$Label$Css$mandatory]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('*')
					]))
			]));
};
var author$project$Form$Label$initialConfig = function (text) {
	return {mandatory: false, text: text};
};
var author$project$Form$Label$view = A2(elm$core$Basics$composeR, author$project$Form$Label$initialConfig, author$project$Form$Label$Label);
var author$project$Form$MultiSelect$Css$container = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var author$project$Form$MultiSelect$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$select, isError, isLocked));
	});
var author$project$Form$MultiSelect$Css$title = function (isFaded) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		author$project$Form$Css$title(isFaded));
};
var author$project$Form$MultiSelect$Internal$Open = {$: 'Open'};
var author$project$Form$MultiSelect$Internal$Clear = {$: 'Clear'};
var author$project$Form$MultiSelect$Internal$clearButton = F2(
	function (state, viewState) {
		return A3(
			author$project$Html$Styled$Bdt$divIf,
			viewState.isClearable && elm$core$List$isEmpty(
				author$project$Resettable$getValue(state.selectedOptions)),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'mousedown',
					elm$json$Json$Decode$succeed(
						_Utils_Tuple2(author$project$Form$MultiSelect$Internal$Clear, true))),
					author$project$Form$Css$clearIcon
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(feathericons$elm_feather$FeatherIcons$withSize, 14, feathericons$elm_feather$FeatherIcons$x)))
				]));
	});
var author$project$Form$MultiSelect$Internal$optionText = F3(
	function (defaultLabel, toLabel, selectedOptions) {
		var _n0 = elm$core$List$isEmpty(
			author$project$Resettable$getValue(selectedOptions));
		if (_n0) {
			return defaultLabel;
		} else {
			return elm$core$String$fromInt(
				elm$core$List$length(
					author$project$Resettable$getValue(selectedOptions))) + (' option' + (((elm$core$List$length(
				author$project$Resettable$getValue(selectedOptions)) > 1) ? 's' : '') + (' selected: ' + A2(
				elm$core$String$join,
				', ',
				A2(
					elm$core$List$map,
					toLabel,
					author$project$Resettable$getValue(selectedOptions))))));
		}
	});
var author$project$Form$MultiSelect$Internal$closed = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$MultiSelect$Css$container,
					rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1)
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2(author$project$Form$MultiSelect$Css$input, viewState.isError, viewState.isLocked),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Events$onFocus(author$project$Form$MultiSelect$Internal$Open))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									author$project$Form$MultiSelect$Css$title(
									elm$core$List$isEmpty(
										author$project$Resettable$getValue(state.selectedOptions))),
									rtfeldman$elm_css$Html$Styled$Attributes$title(
									A3(author$project$Form$MultiSelect$Internal$optionText, viewState.defaultLabel, viewState.toLabel, state.selectedOptions))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A3(author$project$Form$MultiSelect$Internal$optionText, viewState.defaultLabel, viewState.toLabel, state.selectedOptions))
								])),
							A2(author$project$Form$MultiSelect$Internal$clearButton, state, viewState),
							A3(
							author$project$Html$Styled$Bdt$divIf,
							!viewState.isLocked,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(
										feathericons$elm_feather$FeatherIcons$toHtml,
										_List_Nil,
										A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$chevronDown)))
								]))
						]))
				]));
	});
var author$project$Form$MultiSelect$Internal$Blur = {$: 'Blur'};
var author$project$Form$MultiSelect$Internal$SelectKey = F2(
	function (a, b) {
		return {$: 'SelectKey', a: a, b: b};
	});
var author$project$Form$MultiSelect$Css$optionList = rtfeldman$elm_css$Html$Styled$Attributes$css(author$project$Form$Css$selectOptionList);
var author$project$Form$MultiSelect$Css$checkBox = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$marginRight(
			rtfeldman$elm_css$Css$px(6)),
			rtfeldman$elm_css$Css$displayFlex
		]));
var author$project$Form$MultiSelect$Css$optionItem = F2(
	function (isDisabled, isFocused) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$selectOptionItem, isDisabled, isFocused));
	});
var author$project$Form$MultiSelect$Internal$NoOp = {$: 'NoOp'};
var author$project$Form$MultiSelect$Internal$Select = function (a) {
	return {$: 'Select', a: a};
};
var feathericons$elm_feather$FeatherIcons$checkSquare = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'check-square',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-check-square')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$polyline,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('9 11 12 14 22 4')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$path,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$d('M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11')
						]),
					_List_Nil)
				]))
		]));
var feathericons$elm_feather$FeatherIcons$square = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'square',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-square')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$rect,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x('3'),
							elm$svg$Svg$Attributes$y('3'),
							elm$svg$Svg$Attributes$width('18'),
							elm$svg$Svg$Attributes$height('18'),
							elm$svg$Svg$Attributes$rx('2'),
							elm$svg$Svg$Attributes$ry('2')
						]),
					_List_Nil)
				]))
		]));
var author$project$Form$MultiSelect$Internal$optionItem = F3(
	function (state, viewState, option) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A2(
					author$project$Form$MultiSelect$Css$optionItem,
					viewState.isOptionDisabled(option),
					_Utils_eq(
						state.focusedOption,
						elm$core$Maybe$Just(option))),
					A2(
					rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'mousedown',
					elm$json$Json$Decode$succeed(
						_Utils_Tuple2(
							viewState.isOptionDisabled(option) ? author$project$Form$MultiSelect$Internal$NoOp : author$project$Form$MultiSelect$Internal$Select(option),
							true))),
					rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1)
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[author$project$Form$MultiSelect$Css$checkBox]),
					_List_fromArray(
						[
							A2(
							elm$core$List$member,
							option,
							author$project$Resettable$getValue(state.selectedOptions)) ? rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(
								feathericons$elm_feather$FeatherIcons$toHtml,
								_List_Nil,
								A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$checkSquare))) : rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(
								feathericons$elm_feather$FeatherIcons$toHtml,
								_List_Nil,
								A2(feathericons$elm_feather$FeatherIcons$withSize, 18, feathericons$elm_feather$FeatherIcons$square)))
						])),
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$title(
							viewState.toLabel(option))
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(
							viewState.toLabel(option))
						]))
				]));
	});
var author$project$Form$MultiSelect$Internal$optionList = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$MultiSelect$Css$optionList]),
			A2(
				elm$core$List$map,
				A2(author$project$Form$MultiSelect$Internal$optionItem, state, viewState),
				mgold$elm_nonempty_list$List$Nonempty$toList(state.options)));
	});
var author$project$Form$MultiSelect$Internal$open = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$MultiSelect$Css$container]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2(author$project$Form$MultiSelect$Css$input, viewState.isError, viewState.isLocked),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
							rtfeldman$elm_css$Html$Styled$Events$onBlur(author$project$Form$MultiSelect$Internal$Blur),
							author$project$Form$Helpers$onSelectKey(
							author$project$Form$MultiSelect$Internal$SelectKey(viewState.isOptionDisabled)),
							author$project$Form$MultiSelect$Css$title(
							elm$core$List$isEmpty(
								author$project$Resettable$getValue(state.selectedOptions))),
							rtfeldman$elm_css$Html$Styled$Attributes$title(
							A3(author$project$Form$MultiSelect$Internal$optionText, viewState.defaultLabel, viewState.toLabel, state.selectedOptions))
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(
							A3(author$project$Form$MultiSelect$Internal$optionText, viewState.defaultLabel, viewState.toLabel, state.selectedOptions))
						])),
					A2(author$project$Form$MultiSelect$Internal$optionList, state, viewState)
				]));
	});
var author$project$Form$MultiSelect$Internal$render = F2(
	function (state, viewState) {
		var _n0 = state.isOpen;
		if (!_n0) {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$MultiSelect$Internal$closed, state, viewState);
		} else {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$MultiSelect$Internal$open, state, viewState);
		}
	});
var author$project$Form$MultiSelect$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$MultiSelect$Internal$render, state, viewState);
};
var author$project$Form$MultiSelect$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$Form$MultiSelect$Internal$setIsOptionDisabled = F2(
	function (isOptionDisabled, viewState) {
		return _Utils_update(
			viewState,
			{isOptionDisabled: isOptionDisabled});
	});
var author$project$Form$MultiSelect$setIsOptionDisabled = F2(
	function (isOptionDisabled, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$MultiSelect$View,
			state,
			A2(author$project$Form$MultiSelect$Internal$setIsOptionDisabled, isOptionDisabled, viewState));
	});
var author$project$Form$MultiSelect$Internal$initialViewState = function (toLabel) {
	return {
		defaultLabel: '-- Nothing Selected --',
		id: elm$core$Maybe$Nothing,
		isClearable: false,
		isError: false,
		isLocked: false,
		isOptionDisabled: elm$core$Basics$always(false),
		toLabel: toLabel
	};
};
var author$project$Form$MultiSelect$view = F2(
	function (toLabel, _n0) {
		var state = _n0.a;
		return A2(
			author$project$Form$MultiSelect$View,
			state,
			author$project$Form$MultiSelect$Internal$initialViewState(toLabel));
	});
var author$project$Form$SearchSelect$Internal$getSelectedOption = function (state) {
	return author$project$Resettable$getValue(state.selectedOption);
};
var author$project$Form$SearchSelect$getSelectedOption = function (_n0) {
	var state = _n0.a;
	return author$project$Form$SearchSelect$Internal$getSelectedOption(state);
};
var author$project$Form$SearchSelect$Css$container = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var author$project$Form$SearchSelect$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$input, isError, isLocked));
	});
var author$project$Form$SearchSelect$Css$title = function (isFaded) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		author$project$Form$Css$title(isFaded));
};
var author$project$Form$SearchSelect$Internal$Open = {$: 'Open'};
var author$project$Form$SearchSelect$Internal$closed = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$SearchSelect$Css$container]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$input,
					_List_fromArray(
						[
							A2(author$project$Form$SearchSelect$Css$input, viewState.isError, viewState.isLocked),
							author$project$Form$SearchSelect$Css$title(
							_Utils_eq(
								author$project$Resettable$getValue(state.selectedOption),
								elm$core$Maybe$Nothing)),
							A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.id),
							rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
							rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.isLocked),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Events$onFocus(author$project$Form$SearchSelect$Internal$Open)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.isLocked,
							rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Form$SearchSelect$Internal$Open)),
							rtfeldman$elm_css$Html$Styled$Attributes$value(
							A2(
								elm$core$Maybe$withDefault,
								'',
								A2(
									elm$core$Maybe$map,
									viewState.toLabel,
									author$project$Resettable$getValue(state.selectedOption))))
						]),
					_List_Nil)
				]));
	});
var author$project$Form$SearchSelect$Internal$Blur = {$: 'Blur'};
var author$project$Form$SearchSelect$Internal$SelectKey = function (a) {
	return {$: 'SelectKey', a: a};
};
var author$project$Form$SearchSelect$Internal$UpdateSearchInput = F2(
	function (a, b) {
		return {$: 'UpdateSearchInput', a: a, b: b};
	});
var author$project$Form$SearchSelect$Internal$InputMinimum = function (a) {
	return {$: 'InputMinimum', a: a};
};
var author$project$Form$SearchSelect$Internal$NoResults = {$: 'NoResults'};
var author$project$Form$SearchSelect$Internal$Searching = {$: 'Searching'};
var author$project$Form$SearchSelect$Css$infoMessage = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid,
			rtfeldman$elm_css$Css$hex('cccccc')),
			rtfeldman$elm_css$Css$borderTopColor(
			rtfeldman$elm_css$Css$hex('eeeeee')),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$px(8),
			rtfeldman$elm_css$Css$px(12)),
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$px(39)),
			rtfeldman$elm_css$Css$left(
			rtfeldman$elm_css$Css$px(0)),
			rtfeldman$elm_css$Css$right(
			rtfeldman$elm_css$Css$px(0)),
			rtfeldman$elm_css$Css$zIndex(
			rtfeldman$elm_css$Css$int(10)),
			rtfeldman$elm_css$Css$backgroundColor(
			rtfeldman$elm_css$Css$hex('ffffff'))
		]));
var author$project$Form$SearchSelect$Internal$infoMessageContainer = function (message) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[author$project$Form$SearchSelect$Css$infoMessage]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$text(message)
			]));
};
var author$project$Form$SearchSelect$Internal$infoMessage = function (message) {
	switch (message.$) {
		case 'InputMinimum':
			var _int = message.a;
			return author$project$Form$SearchSelect$Internal$infoMessageContainer(
				'please type at least ' + (elm$core$String$fromInt(_int) + ' characters to search'));
		case 'Searching':
			return author$project$Form$SearchSelect$Internal$infoMessageContainer('searching ..');
		default:
			return author$project$Form$SearchSelect$Internal$infoMessageContainer('no results');
	}
};
var author$project$Form$SearchSelect$Css$optionList = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_Utils_ap(
		author$project$Form$Css$selectOptionList,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$top(
				rtfeldman$elm_css$Css$px(39))
			])));
var author$project$Form$SearchSelect$Css$optionItem = function (isFocused) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		A2(author$project$Form$Css$selectOptionItem, false, isFocused));
};
var author$project$Form$SearchSelect$Internal$Select = function (a) {
	return {$: 'Select', a: a};
};
var author$project$Form$SearchSelect$Internal$searchResultItem = F3(
	function (focusedOption, toLabel, option) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$SearchSelect$Css$optionItem(
					_Utils_eq(
						elm$core$Maybe$Just(option),
						focusedOption)),
					rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
					author$project$Form$SearchSelect$Internal$Select(option))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					toLabel(option))
				]));
	});
var author$project$Form$SearchSelect$Internal$searchResultList = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$SearchSelect$Css$optionList]),
			A2(
				elm$core$List$map,
				A2(author$project$Form$SearchSelect$Internal$searchResultItem, state.focusedOption, viewState.toLabel),
				state.options));
	});
var author$project$Form$SearchSelect$Internal$searchResults = F2(
	function (state, viewState) {
		var _n0 = A2(author$project$Form$SearchSelect$Internal$shouldSearch, viewState.inputMinimum, state.input);
		if (!_n0) {
			return author$project$Form$SearchSelect$Internal$infoMessage(
				author$project$Form$SearchSelect$Internal$InputMinimum(viewState.inputMinimum));
		} else {
			var _n1 = state.isSearching;
			if (_n1) {
				return author$project$Form$SearchSelect$Internal$infoMessage(author$project$Form$SearchSelect$Internal$Searching);
			} else {
				var _n2 = elm$core$List$isEmpty(state.options);
				if (_n2) {
					return author$project$Form$SearchSelect$Internal$infoMessage(author$project$Form$SearchSelect$Internal$NoResults);
				} else {
					return A2(author$project$Form$SearchSelect$Internal$searchResultList, state, viewState);
				}
			}
		}
	});
var author$project$Form$SearchSelect$Internal$open = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$SearchSelect$Css$container]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$input,
					_List_fromArray(
						[
							A2(author$project$Form$SearchSelect$Css$input, viewState.isLocked, viewState.isError),
							author$project$Form$SearchSelect$Css$title(
							_Utils_eq(
								author$project$Resettable$getValue(state.selectedOption),
								elm$core$Maybe$Nothing)),
							rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
							rtfeldman$elm_css$Html$Styled$Attributes$placeholder(
							A2(
								elm$core$Maybe$withDefault,
								'',
								A2(
									elm$core$Maybe$map,
									viewState.toLabel,
									author$project$Resettable$getValue(state.selectedOption)))),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
							rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.isLocked),
							rtfeldman$elm_css$Html$Styled$Events$onInput(
							author$project$Form$SearchSelect$Internal$UpdateSearchInput(viewState.inputMinimum)),
							rtfeldman$elm_css$Html$Styled$Events$onBlur(author$project$Form$SearchSelect$Internal$Blur),
							author$project$Form$Helpers$onSelectKey(author$project$Form$SearchSelect$Internal$SelectKey),
							rtfeldman$elm_css$Html$Styled$Attributes$value(state.input)
						]),
					_List_Nil),
					A2(author$project$Form$SearchSelect$Internal$searchResults, state, viewState)
				]));
	});
var author$project$Form$SearchSelect$Internal$render = F2(
	function (state, viewState) {
		var _n0 = state.isOpen;
		if (!_n0) {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$SearchSelect$Internal$closed, state, viewState);
		} else {
			return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$SearchSelect$Internal$open, state, viewState);
		}
	});
var author$project$Form$SearchSelect$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$SearchSelect$Internal$render, state, viewState);
};
var author$project$Form$SearchSelect$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$Form$SearchSelect$Internal$initialViewState = function (toLabel) {
	return {
		defaultLabel: '-- Nothing Selected --',
		id: elm$core$Maybe$Nothing,
		inputMinimum: 2,
		isClearable: false,
		isError: false,
		isLocked: false,
		isOptionDisabled: elm$core$Basics$always(false),
		toLabel: toLabel
	};
};
var author$project$Form$SearchSelect$view = F2(
	function (toLabel, _n0) {
		var state = _n0.a;
		return A2(
			author$project$Form$SearchSelect$View,
			state,
			author$project$Form$SearchSelect$Internal$initialViewState(toLabel));
	});
var author$project$Form$Select$Internal$setIsClearable = F2(
	function (isClearable, viewState) {
		return _Utils_update(
			viewState,
			{isClearable: isClearable});
	});
var author$project$Form$Select$setIsClearable = F2(
	function (isClearable, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$Select$View,
			state,
			A2(author$project$Form$Select$Internal$setIsClearable, isClearable, viewState));
	});
var author$project$Form$Select$Internal$setIsOptionDisabled = F2(
	function (isOptionDisabled, viewState) {
		return _Utils_update(
			viewState,
			{isOptionDisabled: isOptionDisabled});
	});
var author$project$Form$Select$setIsOptionDisabled = F2(
	function (isOptionDisabled, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$Select$View,
			state,
			A2(author$project$Form$Select$Internal$setIsOptionDisabled, isOptionDisabled, viewState));
	});
var rtfeldman$elm_css$Css$normal = {featureTagValue: rtfeldman$elm_css$Css$Structure$Compatible, fontStyle: rtfeldman$elm_css$Css$Structure$Compatible, fontWeight: rtfeldman$elm_css$Css$Structure$Compatible, overflowWrap: rtfeldman$elm_css$Css$Structure$Compatible, value: 'normal', whiteSpace: rtfeldman$elm_css$Css$Structure$Compatible};
var rtfeldman$elm_css$Css$text_ = {cursor: rtfeldman$elm_css$Css$Structure$Compatible, value: 'text'};
var author$project$Form$TextArea$Css$input = F3(
	function (isError, isLocked, shouldWrap) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_Utils_ap(
				A2(author$project$Form$Css$select, isError, isLocked),
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$flexGrow(
						rtfeldman$elm_css$Css$int(1)),
						rtfeldman$elm_css$Css$padding(
						rtfeldman$elm_css$Css$rem(0.4)),
						rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$text_),
						shouldWrap ? rtfeldman$elm_css$Css$whiteSpace(rtfeldman$elm_css$Css$normal) : rtfeldman$elm_css$Css$whiteSpace(rtfeldman$elm_css$Css$noWrap)
					])));
	});
var author$project$Form$TextArea$Internal$Input = function (a) {
	return {$: 'Input', a: a};
};
var rtfeldman$elm_css$Html$Styled$textarea = rtfeldman$elm_css$Html$Styled$node('textarea');
var author$project$Form$TextArea$Internal$inputField = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$textarea,
			_List_fromArray(
				[
					A3(author$project$Form$TextArea$Css$input, viewState.isError, viewState.isLocked, viewState.shouldWrap),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.isLocked),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.value)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(author$project$Form$TextArea$Internal$Input),
					rtfeldman$elm_css$Html$Styled$Attributes$placeholder(viewState.placeholder),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.maxLength),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.id)
				]),
			_List_Nil);
	});
var author$project$Form$TextArea$Internal$render = F2(
	function (state, viewState) {
		return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$Form$TextArea$Internal$inputField, state, viewState);
	});
var author$project$Form$TextArea$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(author$project$Form$TextArea$Internal$render, state, viewState);
};
var author$project$Form$TextArea$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$Form$TextArea$Internal$setPlaceholder = F2(
	function (placeholder, viewState) {
		return _Utils_update(
			viewState,
			{placeholder: placeholder});
	});
var author$project$Form$TextArea$setPlaceholder = F2(
	function (placeholder, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$TextArea$View,
			state,
			A2(author$project$Form$TextArea$Internal$setPlaceholder, placeholder, viewState));
	});
var author$project$Form$TextArea$Internal$setShouldWrap = F2(
	function (shouldWrap, viewState) {
		return _Utils_update(
			viewState,
			{shouldWrap: shouldWrap});
	});
var author$project$Form$TextArea$setShouldWrap = F2(
	function (shouldWrap, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$TextArea$View,
			state,
			A2(author$project$Form$TextArea$Internal$setShouldWrap, shouldWrap, viewState));
	});
var author$project$Form$TextArea$Internal$initialViewState = {id: elm$core$Maybe$Nothing, isError: false, isLocked: false, maxLength: elm$core$Maybe$Nothing, placeholder: '', shouldWrap: false};
var author$project$Form$TextArea$view = function (_n0) {
	var state = _n0.a;
	return A2(author$project$Form$TextArea$View, state, author$project$Form$TextArea$Internal$initialViewState);
};
var author$project$Grid$Col = function (a) {
	return {$: 'Col', a: a};
};
var author$project$Grid$ColConfig = F3(
	function (defaultCols, sizes, children) {
		return {children: children, defaultCols: defaultCols, sizes: sizes};
	});
var author$project$Grid$col = F2(
	function (cols, children) {
		return author$project$Grid$Col(
			A3(author$project$Grid$ColConfig, cols, _List_Nil, children));
	});
var author$project$Grid$colSizes = F3(
	function (cols, sizes, children) {
		return author$project$Grid$Col(
			A3(author$project$Grid$ColConfig, cols, sizes, children));
	});
var author$project$Grid$Css$containerWidth = function (size) {
	return A2(
		rtfeldman$elm_css$Css$Media$withMedia,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Media$all(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$Media$minWidth(
						rtfeldman$elm_css$Css$px(
							author$project$Grid$SizeHelpers$breakpointPxWidth(size)))
					]))
			]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$width(
				rtfeldman$elm_css$Css$px(
					author$project$Grid$SizeHelpers$containerPxWidth(size)))
			]));
};
var author$project$Grid$Size$Lg = {$: 'Lg'};
var author$project$Grid$Size$Md = {$: 'Md'};
var author$project$Grid$Size$Sm = {$: 'Sm'};
var author$project$Grid$Size$Xl = {$: 'Xl'};
var author$project$Grid$Size$Xs = {$: 'Xs'};
var author$project$Grid$SizeHelpers$sizeAsList = _List_fromArray(
	[author$project$Grid$Size$Xs, author$project$Grid$Size$Sm, author$project$Grid$Size$Md, author$project$Grid$Size$Lg, author$project$Grid$Size$Xl]);
var rtfeldman$elm_css$Css$calcExpressionToString = function (expression) {
	if (expression.$ === 'Addition') {
		return '+';
	} else {
		return '-';
	}
};
var rtfeldman$elm_css$Css$calc = F3(
	function (firstExpr, expression, secondExpr) {
		var withoutCalcStr = function (l) {
			return A2(elm$core$String$startsWith, 'calc(', l.value) ? A2(elm$core$String$dropLeft, 4, l.value) : l.value;
		};
		var calcs = A2(
			elm$core$String$join,
			' ',
			_List_fromArray(
				[
					withoutCalcStr(firstExpr),
					rtfeldman$elm_css$Css$calcExpressionToString(expression),
					withoutCalcStr(secondExpr)
				]));
		var value = A2(
			rtfeldman$elm_css$Css$cssFunction,
			'calc',
			_List_fromArray(
				[calcs]));
		return {calc: rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: rtfeldman$elm_css$Css$Structure$Compatible, fontSize: rtfeldman$elm_css$Css$Structure$Compatible, length: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible, textIndent: rtfeldman$elm_css$Css$Structure$Compatible, value: value};
	});
var rtfeldman$elm_css$Css$Subtraction = {$: 'Subtraction'};
var rtfeldman$elm_css$Css$minus = rtfeldman$elm_css$Css$Subtraction;
var author$project$Grid$Css$containerWidths = _Utils_ap(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$width(
			A3(
				rtfeldman$elm_css$Css$calc,
				rtfeldman$elm_css$Css$pct(100),
				rtfeldman$elm_css$Css$minus,
				rtfeldman$elm_css$Css$rem(2)))
		]),
	A2(
		elm$core$List$map,
		author$project$Grid$Css$containerWidth,
		elm$core$List$reverse(author$project$Grid$SizeHelpers$sizeAsList)));
var rtfeldman$elm_css$Css$paddingLeft = rtfeldman$elm_css$Css$prop1('padding-left');
var rtfeldman$elm_css$Css$paddingRight = rtfeldman$elm_css$Css$prop1('padding-right');
var author$project$Grid$Css$container = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_Utils_ap(
		author$project$Grid$Css$containerWidths,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$maxWidth(
				rtfeldman$elm_css$Css$pct(100)),
				rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
				rtfeldman$elm_css$Css$paddingLeft(
				rtfeldman$elm_css$Css$px(15)),
				rtfeldman$elm_css$Css$paddingRight(
				rtfeldman$elm_css$Css$px(15)),
				rtfeldman$elm_css$Css$marginLeft(rtfeldman$elm_css$Css$auto),
				rtfeldman$elm_css$Css$marginRight(rtfeldman$elm_css$Css$auto),
				rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					['Arial']))
			])));
var author$project$Grid$container = F2(
	function (attributes, children) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_Utils_ap(
				_List_fromArray(
					[author$project$Grid$Css$container]),
				attributes),
			children);
	});
var author$project$Grid$Css$col = F2(
	function (cols, sizes) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_Utils_ap(
				A2(
					elm$core$List$map,
					author$project$Grid$Css$colSize,
					elm$core$List$reverse(
						author$project$Grid$SizeHelpers$orderBySize(sizes))),
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$flexGrow(
						rtfeldman$elm_css$Css$num(1)),
						rtfeldman$elm_css$Css$paddingLeft(
						rtfeldman$elm_css$Css$px(15)),
						rtfeldman$elm_css$Css$paddingRight(
						rtfeldman$elm_css$Css$px(15)),
						rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
						author$project$Grid$Css$defaultColSize(cols)
					])));
	});
var author$project$Grid$renderCol = function (_n0) {
	var colConfig = _n0.a;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		!elm$core$List$isEmpty(colConfig.children),
		_List_fromArray(
			[
				A2(author$project$Grid$Css$col, colConfig.defaultCols, colConfig.sizes)
			]),
		colConfig.children);
};
var author$project$Grid$Css$row = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$flexWrap(rtfeldman$elm_css$Css$wrap),
			rtfeldman$elm_css$Css$marginLeft(
			rtfeldman$elm_css$Css$px(-15)),
			rtfeldman$elm_css$Css$marginRight(
			rtfeldman$elm_css$Css$px(-15))
		]));
var author$project$Grid$row = function (cols) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[author$project$Grid$Css$row]),
		A2(elm$core$List$map, author$project$Grid$renderCol, cols));
};
var author$project$Grid$Size$Four = {$: 'Four'};
var author$project$Grid$Size$Six = {$: 'Six'};
var author$project$Grid$Size$Three = {$: 'Three'};
var author$project$Grid$Size$Twelve = {$: 'Twelve'};
var author$project$Grid$Size$Two = {$: 'Two'};
var author$project$Html$Styled$Bdt$maybeView = F2(
	function (maybe, f) {
		if (maybe.$ === 'Nothing') {
			return rtfeldman$elm_css$Html$Styled$text('');
		} else {
			var a = maybe.a;
			return f(a);
		}
	});
var author$project$Index$Msg$AddGreenToaster = {$: 'AddGreenToaster'};
var author$project$Index$Msg$AddRedToaster = {$: 'AddRedToaster'};
var author$project$Index$Msg$DisabledToggle = {$: 'DisabledToggle'};
var author$project$Index$Msg$FloatInputMsg = function (a) {
	return {$: 'FloatInputMsg', a: a};
};
var author$project$Index$Msg$InputMsg = function (a) {
	return {$: 'InputMsg', a: a};
};
var author$project$Index$Msg$IntInputMsg = function (a) {
	return {$: 'IntInputMsg', a: a};
};
var author$project$Index$Msg$SetGridButtonGreen = function (a) {
	return {$: 'SetGridButtonGreen', a: a};
};
var author$project$Index$Msg$TextAreaMsg = function (a) {
	return {$: 'TextAreaMsg', a: a};
};
var author$project$Index$Msg$Toggle1 = {$: 'Toggle1'};
var author$project$Index$Msg$Toggle2 = {$: 'Toggle2'};
var author$project$Index$Msg$ToggleLgModal = {$: 'ToggleLgModal'};
var author$project$Index$Msg$ToggleResizeModal = {$: 'ToggleResizeModal'};
var author$project$Index$Msg$ToggleSmModal = {$: 'ToggleSmModal'};
var author$project$Index$Msg$ToolTip1Msg = function (a) {
	return {$: 'ToolTip1Msg', a: a};
};
var author$project$Index$Msg$ToolTip2Msg = function (a) {
	return {$: 'ToolTip2Msg', a: a};
};
var author$project$Index$Msg$ToolTip3Msg = function (a) {
	return {$: 'ToolTip3Msg', a: a};
};
var author$project$Index$Msg$ToolTip4Msg = function (a) {
	return {$: 'ToolTip4Msg', a: a};
};
var author$project$Index$Msg$UpdateEmail = function (a) {
	return {$: 'UpdateEmail', a: a};
};
var author$project$Index$Msg$UpdateMaybeBLockSelect = function (a) {
	return {$: 'UpdateMaybeBLockSelect', a: a};
};
var author$project$Index$Msg$UpdateName = function (a) {
	return {$: 'UpdateName', a: a};
};
var author$project$Index$Msg$UpdatePreferredGenre = function (a) {
	return {$: 'UpdatePreferredGenre', a: a};
};
var author$project$Records$MusicGenre$toLabel = function (genre) {
	switch (genre.$) {
		case 'Rock':
			return 'Rock';
		case 'Metal':
			return 'Metal';
		case 'Blues':
			return 'Blues';
		case 'Jazz':
			return 'Jazz';
		case 'Pop':
			return 'Pop';
		default:
			return 'Blackened Heavy progressive Alternative New-age Rockabilly Glam-core Retro-folk Neo-soul Acid-funk Doo-wop Electrical Dream-pop';
	}
};
var rtfeldman$elm_css$Html$Styled$p = rtfeldman$elm_css$Html$Styled$node('p');
var author$project$Index$View$maybeBlockView = function (musicGenre) {
	return _List_fromArray(
		[
			A2(
			rtfeldman$elm_css$Html$Styled$p,
			_List_Nil,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('This Block only appears if the Select is Just. It is hidden of the select is Nothing (clear select to make it disapear).')
				])),
			A2(
			rtfeldman$elm_css$Html$Styled$p,
			_List_Nil,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					'Selected: ' + author$project$Records$MusicGenre$toLabel(musicGenre))
				]))
		]);
};
var author$project$Modal$ModalBlock = function (a) {
	return {$: 'ModalBlock', a: a};
};
var author$project$Modal$ModalBlockConfig = F3(
	function (defaultCols, sizes, children) {
		return {children: children, defaultCols: defaultCols, sizes: sizes};
	});
var author$project$Modal$block = F2(
	function (cols, children) {
		return author$project$Modal$ModalBlock(
			A3(author$project$Modal$ModalBlockConfig, cols, _List_Nil, children));
	});
var author$project$Modal$blockSizes = F3(
	function (cols, sizes, children) {
		return author$project$Modal$ModalBlock(
			A3(author$project$Modal$ModalBlockConfig, cols, sizes, children));
	});
var author$project$Modal$Config = function (a) {
	return {$: 'Config', a: a};
};
var author$project$Modal$body = F2(
	function (modalBlocks, _n0) {
		var viewConfig = _n0.a;
		return author$project$Modal$Config(
			_Utils_update(
				viewConfig,
				{modalBlocks: modalBlocks}));
	});
var author$project$Modal$footer = F2(
	function (buttons, _n0) {
		var viewConfig = _n0.a;
		return author$project$Modal$Config(
			_Utils_update(
				viewConfig,
				{footerButtons: buttons}));
	});
var author$project$Modal$header = F3(
	function (title, buttons, _n0) {
		var viewConfig = _n0.a;
		return author$project$Modal$Config(
			_Utils_update(
				viewConfig,
				{headerButtons: buttons, headerTitle: title}));
	});
var author$project$Modal$Css$closeIcon = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
			rtfeldman$elm_css$Css$right(
			rtfeldman$elm_css$Css$rem(1)),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$rem(1)),
			rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer)
		]));
var author$project$Modal$closeIcon = function (closeMsg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				author$project$Modal$Css$closeIcon,
				rtfeldman$elm_css$Html$Styled$Events$onClick(closeMsg)
			]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$fromUnstyled(
				A2(
					feathericons$elm_feather$FeatherIcons$toHtml,
					_List_Nil,
					A2(feathericons$elm_feather$FeatherIcons$withSize, 14, feathericons$elm_feather$FeatherIcons$x)))
			]));
};
var author$project$Modal$Css$block = F2(
	function (cols, sizes) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_Utils_ap(
				A2(
					elm$core$List$map,
					author$project$Grid$Css$colSize,
					elm$core$List$reverse(
						author$project$Grid$SizeHelpers$orderBySize(sizes))),
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$flexGrow(
						rtfeldman$elm_css$Css$num(1)),
						A2(
						rtfeldman$elm_css$Css$padding2,
						rtfeldman$elm_css$Css$rem(0.2),
						rtfeldman$elm_css$Css$rem(0.8)),
						rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
						author$project$Grid$Css$defaultColSize(cols)
					])));
	});
var author$project$Modal$renderModalBlock = function (_n0) {
	var modalBlockConfig = _n0.a;
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2(author$project$Modal$Css$block, modalBlockConfig.defaultCols, modalBlockConfig.sizes)
			]),
		modalBlockConfig.children);
};
var rtfeldman$elm_css$Css$bottom = rtfeldman$elm_css$Css$prop1('bottom');
var author$project$Modal$Css$background = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$backgroundColor(
			A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.4)),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$fixed),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$px(0)),
			rtfeldman$elm_css$Css$right(
			rtfeldman$elm_css$Css$px(0)),
			rtfeldman$elm_css$Css$bottom(
			rtfeldman$elm_css$Css$px(0)),
			rtfeldman$elm_css$Css$left(
			rtfeldman$elm_css$Css$px(0)),
			rtfeldman$elm_css$Css$zIndex(
			rtfeldman$elm_css$Css$int(100))
		]));
var rtfeldman$elm_css$Css$VhUnits = {$: 'VhUnits'};
var rtfeldman$elm_css$Css$vh = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$VhUnits, 'vh');
var author$project$Modal$Css$body = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$flexWrap(rtfeldman$elm_css$Css$wrap),
			A2(
			rtfeldman$elm_css$Css$margin2,
			rtfeldman$elm_css$Css$rem(0.8),
			rtfeldman$elm_css$Css$rem(0)),
			rtfeldman$elm_css$Css$maxHeight(
			A3(
				rtfeldman$elm_css$Css$calc,
				rtfeldman$elm_css$Css$vh(100),
				rtfeldman$elm_css$Css$minus,
				rtfeldman$elm_css$Css$rem(13))),
			rtfeldman$elm_css$Css$overflowY(rtfeldman$elm_css$Css$auto)
		]));
var author$project$Modal$Css$footer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$flexEnd),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$rem(0),
			rtfeldman$elm_css$Css$rem(0.8))
		]));
var author$project$Modal$Css$header = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$displayFlex,
			rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$spaceBetween),
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$rem(0),
			rtfeldman$elm_css$Css$rem(0.8)),
			rtfeldman$elm_css$Css$fontFamilies(
			_List_fromArray(
				['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'])),
			rtfeldman$elm_css$Css$fontSize(
			rtfeldman$elm_css$Css$rem(1.2)),
			rtfeldman$elm_css$Css$fontWeight(
			rtfeldman$elm_css$Css$int(600))
		]));
var rtfeldman$elm_css$Css$valuesOrNone = function (list) {
	return elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				function ($) {
					return $.value;
				},
				list))
	};
};
var rtfeldman$elm_css$Css$transforms = A2(
	elm$core$Basics$composeL,
	rtfeldman$elm_css$Css$prop1('transform'),
	rtfeldman$elm_css$Css$valuesOrNone);
var rtfeldman$elm_css$Css$transform = function (only) {
	return rtfeldman$elm_css$Css$transforms(
		_List_fromArray(
			[only]));
};
var rtfeldman$elm_css$Css$translate = function (_n0) {
	var value = _n0.value;
	return {
		transform: rtfeldman$elm_css$Css$Structure$Compatible,
		value: A2(
			rtfeldman$elm_css$Css$cssFunction,
			'translate',
			_List_fromArray(
				[value]))
	};
};
var author$project$Modal$Css$modal = function (size) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		_Utils_ap(
			author$project$Grid$Css$containerWidths,
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$maxWidth(
					rtfeldman$elm_css$Css$px(
						author$project$Grid$SizeHelpers$containerPxWidth(size))),
					rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
					rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$fixed),
					rtfeldman$elm_css$Css$top(
					rtfeldman$elm_css$Css$rem(3)),
					rtfeldman$elm_css$Css$left(
					rtfeldman$elm_css$Css$pct(50)),
					rtfeldman$elm_css$Css$transform(
					rtfeldman$elm_css$Css$translate(
						rtfeldman$elm_css$Css$pct(-50))),
					rtfeldman$elm_css$Css$zIndex(
					rtfeldman$elm_css$Css$int(100)),
					rtfeldman$elm_css$Css$backgroundColor(
					rtfeldman$elm_css$Css$hex('ffffff')),
					rtfeldman$elm_css$Css$borderRadius(
					rtfeldman$elm_css$Css$px(2)),
					rtfeldman$elm_css$Css$padding(
					rtfeldman$elm_css$Css$rem(1)),
					A3(
					rtfeldman$elm_css$Css$border3,
					rtfeldman$elm_css$Css$px(1),
					rtfeldman$elm_css$Css$solid,
					rtfeldman$elm_css$Css$hex('777777'))
				])));
};
var rtfeldman$elm_css$Css$Structure$TypeSelector = function (a) {
	return {$: 'TypeSelector', a: a};
};
var rtfeldman$elm_css$Css$Global$typeSelector = F2(
	function (selectorStr, styles) {
		var sequence = A2(
			rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
			rtfeldman$elm_css$Css$Structure$TypeSelector(selectorStr),
			_List_Nil);
		var sel = A3(rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, elm$core$Maybe$Nothing);
		return rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3(rtfeldman$elm_css$Css$Preprocess$StyleBlock, sel, _List_Nil, styles))
				]));
	});
var rtfeldman$elm_css$Css$Global$body = rtfeldman$elm_css$Css$Global$typeSelector('body');
var author$project$Modal$Css$removeBodyScroll = rtfeldman$elm_css$Css$Global$global(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$Global$body(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$overflow(rtfeldman$elm_css$Css$hidden)
				]))
		]));
var author$project$Modal$render = function (_n0) {
	var viewConfig = _n0.a;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		viewConfig.isOpen,
		_List_Nil,
		_List_fromArray(
			[
				author$project$Modal$Css$removeBodyScroll,
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Modal$Css$background,
						rtfeldman$elm_css$Html$Styled$Events$onClick(viewConfig.closeMsg)
					]),
				_List_Nil),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Modal$Css$modal(viewConfig.size)
					]),
				_List_fromArray(
					[
						author$project$Modal$closeIcon(viewConfig.closeMsg),
						A3(
						author$project$Html$Styled$Bdt$divIf,
						(viewConfig.headerTitle !== '') || (!elm$core$List$isEmpty(viewConfig.headerButtons)),
						_List_fromArray(
							[author$project$Modal$Css$header]),
						_List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										rtfeldman$elm_css$Html$Styled$text(viewConfig.headerTitle)
									])),
								A2(
								rtfeldman$elm_css$Html$Styled$div,
								_List_Nil,
								A2(elm$core$List$map, author$project$Button$render, viewConfig.headerButtons))
							])),
						A3(
						author$project$Html$Styled$Bdt$divIf,
						!elm$core$List$isEmpty(viewConfig.modalBlocks),
						_List_fromArray(
							[author$project$Modal$Css$body]),
						A2(elm$core$List$map, author$project$Modal$renderModalBlock, viewConfig.modalBlocks)),
						A3(
						author$project$Html$Styled$Bdt$divIf,
						!elm$core$List$isEmpty(viewConfig.footerButtons),
						_List_fromArray(
							[author$project$Modal$Css$footer]),
						A2(elm$core$List$map, author$project$Button$render, viewConfig.footerButtons))
					]))
			]));
};
var author$project$Modal$setSize = F2(
	function (size, _n0) {
		var viewConfig = _n0.a;
		return author$project$Modal$Config(
			_Utils_update(
				viewConfig,
				{size: size}));
	});
var author$project$Modal$initialViewConfig = F2(
	function (isOpen, msg) {
		return {closeMsg: msg, footerButtons: _List_Nil, headerButtons: _List_Nil, headerTitle: '', isOpen: isOpen, modalBlocks: _List_Nil, size: author$project$Grid$Size$Md};
	});
var author$project$Modal$viewIf = function (isOpen) {
	return A2(
		elm$core$Basics$composeL,
		author$project$Modal$Config,
		author$project$Modal$initialViewConfig(isOpen));
};
var author$project$Toggle$Toggle = function (a) {
	return {$: 'Toggle', a: a};
};
var author$project$Toggle$isDisabled = F2(
	function (isDisabled_, _n0) {
		var config = _n0.a;
		return author$project$Toggle$Toggle(
			_Utils_update(
				config,
				{isDisabled: isDisabled_}));
	});
var author$project$Toggle$label = F2(
	function (label_, _n0) {
		var config = _n0.a;
		return author$project$Toggle$Toggle(
			_Utils_update(
				config,
				{label: label_}));
	});
var author$project$Toggle$Css$label = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$fontFamilies(
			_List_fromArray(
				['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'])),
			rtfeldman$elm_css$Css$fontWeight(
			rtfeldman$elm_css$Css$int(100)),
			rtfeldman$elm_css$Css$color(
			A3(rtfeldman$elm_css$Css$rgb, 111, 111, 111)),
			rtfeldman$elm_css$Css$marginLeft(
			rtfeldman$elm_css$Css$px(5))
		]));
var author$project$Toggle$Css$labelContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineFlex),
			rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
		]));
var author$project$Toggle$Css$toggleColor = F3(
	function (toggle_, isDisabled, isError) {
		var _n0 = _Utils_Tuple3(toggle_, isDisabled, isError);
		if (!_n0.b) {
			if (!_n0.c) {
				if (_n0.a) {
					return A3(rtfeldman$elm_css$Css$rgb, 81, 163, 81);
				} else {
					return rtfeldman$elm_css$Css$hex('ddd');
				}
			} else {
				return A3(rtfeldman$elm_css$Css$rgb, 163, 81, 81);
			}
		} else {
			return rtfeldman$elm_css$Css$hex('efefef');
		}
	});
var rtfeldman$elm_css$Css$Preprocess$WithPseudoElement = F2(
	function (a, b) {
		return {$: 'WithPseudoElement', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$PseudoElement = function (a) {
	return {$: 'PseudoElement', a: a};
};
var rtfeldman$elm_css$Css$pseudoElement = function (element) {
	return rtfeldman$elm_css$Css$Preprocess$WithPseudoElement(
		rtfeldman$elm_css$Css$Structure$PseudoElement(element));
};
var rtfeldman$elm_css$Css$after = rtfeldman$elm_css$Css$pseudoElement('after');
var rtfeldman$elm_css$Css$before = rtfeldman$elm_css$Css$pseudoElement('before');
var rtfeldman$elm_css$Css$block = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'block'};
var rtfeldman$elm_css$Css$inlineBlock = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline-block'};
var rtfeldman$elm_css$Css$Transitions$BackgroundColor = {$: 'BackgroundColor'};
var rtfeldman$elm_css$Css$Transitions$backgroundColor = rtfeldman$elm_css$Css$Transitions$durationTransition(rtfeldman$elm_css$Css$Transitions$BackgroundColor);
var rtfeldman$elm_css$Css$Transitions$BorderColor = {$: 'BorderColor'};
var rtfeldman$elm_css$Css$Transitions$borderColor = rtfeldman$elm_css$Css$Transitions$durationTransition(rtfeldman$elm_css$Css$Transitions$BorderColor);
var rtfeldman$elm_css$Css$Transitions$Margin = {$: 'Margin'};
var rtfeldman$elm_css$Css$Transitions$margin = rtfeldman$elm_css$Css$Transitions$durationTransition(rtfeldman$elm_css$Css$Transitions$Margin);
var author$project$Toggle$Css$toggle = F3(
	function (toggle_, isDisabled, isError) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
					rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
					rtfeldman$elm_css$Css$cursor(
					isDisabled ? rtfeldman$elm_css$Css$notAllowed : rtfeldman$elm_css$Css$pointer),
					rtfeldman$elm_css$Css$width(
					rtfeldman$elm_css$Css$rem(3)),
					rtfeldman$elm_css$Css$height(
					rtfeldman$elm_css$Css$rem(1.5)),
					rtfeldman$elm_css$Css$boxSizing(rtfeldman$elm_css$Css$borderBox),
					rtfeldman$elm_css$Css$backgroundColor(
					A3(author$project$Toggle$Css$toggleColor, toggle_, isDisabled, isError)),
					A3(
					rtfeldman$elm_css$Css$border3,
					rtfeldman$elm_css$Css$px(1),
					rtfeldman$elm_css$Css$solid,
					A3(author$project$Toggle$Css$toggleColor, toggle_, isDisabled, isError)),
					rtfeldman$elm_css$Css$borderRadius(
					rtfeldman$elm_css$Css$rem(1.5)),
					rtfeldman$elm_css$Css$Transitions$transition(
					_List_fromArray(
						[
							rtfeldman$elm_css$Css$Transitions$backgroundColor(400),
							rtfeldman$elm_css$Css$Transitions$borderColor(400)
						])),
					rtfeldman$elm_css$Css$before(
					_List_fromArray(
						[
							rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$block),
							rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
							rtfeldman$elm_css$Css$top(
							rtfeldman$elm_css$Css$px(1)),
							rtfeldman$elm_css$Css$right(
							rtfeldman$elm_css$Css$px(1)),
							rtfeldman$elm_css$Css$left(
							rtfeldman$elm_css$Css$px(1)),
							rtfeldman$elm_css$Css$bottom(
							rtfeldman$elm_css$Css$px(1)),
							A2(rtfeldman$elm_css$Css$property, 'content', ''),
							rtfeldman$elm_css$Css$backgroundColor(
							toggle_ ? rtfeldman$elm_css$Css$hex('8ce196') : rtfeldman$elm_css$Css$hex('f1f1f1')),
							rtfeldman$elm_css$Css$borderRadius(
							rtfeldman$elm_css$Css$rem(1.3))
						])),
					rtfeldman$elm_css$Css$after(
					_List_fromArray(
						[
							rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$block),
							rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
							rtfeldman$elm_css$Css$top(
							rtfeldman$elm_css$Css$px(1)),
							rtfeldman$elm_css$Css$left(
							rtfeldman$elm_css$Css$px(1)),
							rtfeldman$elm_css$Css$bottom(
							rtfeldman$elm_css$Css$px(1)),
							A2(rtfeldman$elm_css$Css$property, 'content', '\'\''),
							rtfeldman$elm_css$Css$width(
							rtfeldman$elm_css$Css$rem(1.3)),
							rtfeldman$elm_css$Css$backgroundColor(
							isDisabled ? rtfeldman$elm_css$Css$hex('eee') : rtfeldman$elm_css$Css$hex('fff')),
							rtfeldman$elm_css$Css$borderRadius(
							rtfeldman$elm_css$Css$rem(1.3)),
							A4(
							rtfeldman$elm_css$Css$boxShadow4,
							rtfeldman$elm_css$Css$px(0),
							rtfeldman$elm_css$Css$px(2),
							rtfeldman$elm_css$Css$px(5),
							A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.3)),
							rtfeldman$elm_css$Css$Transitions$transition(
							_List_fromArray(
								[
									rtfeldman$elm_css$Css$Transitions$margin(400)
								])),
							rtfeldman$elm_css$Css$marginLeft(
							toggle_ ? rtfeldman$elm_css$Css$rem(1.45) : rtfeldman$elm_css$Css$rem(0))
						]))
				]));
	});
var author$project$Toggle$render = function (_n0) {
	var config = _n0.a;
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[author$project$Toggle$Css$labelContainer]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A3(author$project$Toggle$Css$toggle, config.isToggled, config.isDisabled, config.isError),
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!config.isDisabled,
						rtfeldman$elm_css$Html$Styled$Events$onClick(config.toggleMsg))
					]),
				_List_Nil),
				A2(
				rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[author$project$Toggle$Css$label]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text(config.label)
					]))
			]));
};
var author$project$Toggle$initialConfig = F2(
	function (toggled, toggleMsg) {
		return {isDisabled: false, isError: false, isToggled: toggled, label: '', toggleMsg: toggleMsg};
	});
var author$project$Toggle$view = F2(
	function (toggled, msg) {
		return author$project$Toggle$Toggle(
			A2(author$project$Toggle$initialConfig, toggled, msg));
	});
var author$project$ToolTip$Blue = {$: 'Blue'};
var author$project$ToolTip$View = F2(
	function (a, b) {
		return {$: 'View', a: a, b: b};
	});
var author$project$ToolTip$blue = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(
		author$project$ToolTip$View,
		state,
		_Utils_update(
			viewState,
			{color: author$project$ToolTip$Blue}));
};
var author$project$ToolTip$Bottom = {$: 'Bottom'};
var author$project$ToolTip$bottom = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(
		author$project$ToolTip$View,
		state,
		_Utils_update(
			viewState,
			{placement: author$project$ToolTip$Bottom}));
};
var author$project$ToolTip$Green = {$: 'Green'};
var author$project$ToolTip$green = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(
		author$project$ToolTip$View,
		state,
		_Utils_update(
			viewState,
			{color: author$project$ToolTip$Green}));
};
var author$project$ToolTip$icon = F2(
	function (featherIcon, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$ToolTip$View,
			state,
			_Utils_update(
				viewState,
				{
					content: author$project$Content$Icon(featherIcon)
				}));
	});
var author$project$ToolTip$Left = {$: 'Left'};
var author$project$ToolTip$left = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(
		author$project$ToolTip$View,
		state,
		_Utils_update(
			viewState,
			{placement: author$project$ToolTip$Left}));
};
var author$project$ToolTip$Red = {$: 'Red'};
var author$project$ToolTip$red = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(
		author$project$ToolTip$View,
		state,
		_Utils_update(
			viewState,
			{color: author$project$ToolTip$Red}));
};
var author$project$ToolTip$MouseEnter = {$: 'MouseEnter'};
var author$project$ToolTip$MouseLeave = {$: 'MouseLeave'};
var rtfeldman$elm_css$Css$bold = {fontWeight: rtfeldman$elm_css$Css$Structure$Compatible, value: 'bold'};
var rtfeldman$elm_css$Css$default = {cursor: rtfeldman$elm_css$Css$Structure$Compatible, value: 'default'};
var author$project$ToolTip$contentWrapper = function (colorConfig) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$color(
				function () {
					switch (colorConfig.$) {
						case 'Green':
							return rtfeldman$elm_css$Css$hex('3FC380');
						case 'Blue':
							return rtfeldman$elm_css$Css$hex('59ABE3');
						case 'Red':
							return rtfeldman$elm_css$Css$hex('dc3545');
						default:
							return rtfeldman$elm_css$Css$hex('000000');
					}
				}()),
				rtfeldman$elm_css$Css$fontSize(
				rtfeldman$elm_css$Css$rem(0.75)),
				A2(
				rtfeldman$elm_css$Css$padding2,
				rtfeldman$elm_css$Css$rem(0.2),
				rtfeldman$elm_css$Css$rem(0.5)),
				rtfeldman$elm_css$Css$borderRadius(
				rtfeldman$elm_css$Css$px(3)),
				rtfeldman$elm_css$Css$fontWeight(rtfeldman$elm_css$Css$bold),
				rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$default),
				rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineFlex),
				rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
			]));
};
var author$project$ToolTip$renderContent = F2(
	function (colorConfig, content) {
		if (content.$ === 'Icon') {
			var icon_ = content.a;
			return rtfeldman$elm_css$Html$Styled$fromUnstyled(
				A2(feathericons$elm_feather$FeatherIcons$toHtml, _List_Nil, icon_));
		} else {
			var string = content.a;
			return rtfeldman$elm_css$Html$Styled$text(string);
		}
	});
var rtfeldman$elm_css$Css$translateX = function (_n0) {
	var value = _n0.value;
	return {
		transform: rtfeldman$elm_css$Css$Structure$Compatible,
		value: A2(
			rtfeldman$elm_css$Css$cssFunction,
			'translateX',
			_List_fromArray(
				[value]))
	};
};
var author$project$ToolTip$placementPosition = function (placement) {
	switch (placement.$) {
		case 'Right':
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$top(
					rtfeldman$elm_css$Css$rem(-0.25)),
					rtfeldman$elm_css$Css$left(
					rtfeldman$elm_css$Css$pct(100))
				]);
		case 'Top':
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$top(
					rtfeldman$elm_css$Css$pct(-100)),
					rtfeldman$elm_css$Css$left(
					rtfeldman$elm_css$Css$rem(0))
				]);
		case 'Bottom':
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$top(
					rtfeldman$elm_css$Css$pct(100)),
					rtfeldman$elm_css$Css$left(
					rtfeldman$elm_css$Css$rem(0))
				]);
		default:
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$top(
					rtfeldman$elm_css$Css$rem(-0.25)),
					rtfeldman$elm_css$Css$left(
					rtfeldman$elm_css$Css$rem(-0.25)),
					rtfeldman$elm_css$Css$transform(
					rtfeldman$elm_css$Css$translateX(
						rtfeldman$elm_css$Css$pct(-100)))
				]);
	}
};
var rtfeldman$elm_css$Css$prop5 = F6(
	function (key, argA, argB, argC, argD, argE) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value, argD.value, argE.value])));
	});
var rtfeldman$elm_css$Css$boxShadow5 = rtfeldman$elm_css$Css$prop5('box-shadow');
var author$project$ToolTip$tooltip = function (placement) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		A2(
			elm$core$List$append,
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
					A5(
					rtfeldman$elm_css$Css$boxShadow5,
					rtfeldman$elm_css$Css$px(0),
					rtfeldman$elm_css$Css$px(2),
					rtfeldman$elm_css$Css$px(8),
					rtfeldman$elm_css$Css$px(0),
					A3(rtfeldman$elm_css$Css$rgb, 110, 110, 110)),
					A2(
					rtfeldman$elm_css$Css$padding2,
					rtfeldman$elm_css$Css$rem(0.3),
					rtfeldman$elm_css$Css$rem(0.6)),
					rtfeldman$elm_css$Css$borderRadius(
					rtfeldman$elm_css$Css$px(2)),
					rtfeldman$elm_css$Css$backgroundColor(
					rtfeldman$elm_css$Css$hex('fff')),
					rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$default),
					rtfeldman$elm_css$Css$fontFamilies(
					_List_fromArray(
						['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'])),
					rtfeldman$elm_css$Css$fontWeight(
					rtfeldman$elm_css$Css$int(100)),
					rtfeldman$elm_css$Css$fontSize(
					rtfeldman$elm_css$Css$rem(0.75)),
					rtfeldman$elm_css$Css$color(
					A3(rtfeldman$elm_css$Css$rgb, 90, 90, 90)),
					rtfeldman$elm_css$Css$whiteSpace(rtfeldman$elm_css$Css$noWrap),
					rtfeldman$elm_css$Css$zIndex(
					rtfeldman$elm_css$Css$int(10))
				]),
			author$project$ToolTip$placementPosition(placement)));
};
var rtfeldman$elm_css$Html$Styled$Events$onMouseEnter = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'mouseenter',
		elm$json$Json$Decode$succeed(msg));
};
var rtfeldman$elm_css$Html$Styled$Events$onMouseLeave = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'mouseleave',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$ToolTip$render = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Events$onMouseEnter(author$project$ToolTip$MouseEnter),
				rtfeldman$elm_css$Html$Styled$Events$onMouseLeave(author$project$ToolTip$MouseLeave),
				author$project$ToolTip$contentWrapper(viewState.color)
			]),
		_List_fromArray(
			[
				A2(author$project$ToolTip$renderContent, viewState.color, viewState.content),
				A3(
				author$project$Html$Styled$Bdt$divIf,
				state.isOpen,
				_List_fromArray(
					[
						author$project$ToolTip$tooltip(viewState.placement)
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text(state.tip)
					]))
			]));
};
var author$project$ToolTip$text = F2(
	function (contents, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$ToolTip$View,
			state,
			_Utils_update(
				viewState,
				{
					content: author$project$Content$Text(contents)
				}));
	});
var author$project$ToolTip$Top = {$: 'Top'};
var author$project$ToolTip$top = function (_n0) {
	var state = _n0.a;
	var viewState = _n0.b;
	return A2(
		author$project$ToolTip$View,
		state,
		_Utils_update(
			viewState,
			{placement: author$project$ToolTip$Top}));
};
var author$project$ToolTip$Default = {$: 'Default'};
var author$project$ToolTip$Right = {$: 'Right'};
var author$project$ToolTip$initialViewState = {
	color: author$project$ToolTip$Default,
	content: author$project$Content$Text(''),
	placement: author$project$ToolTip$Right
};
var author$project$ToolTip$view = function (_n0) {
	var state = _n0.a;
	return A2(author$project$ToolTip$View, state, author$project$ToolTip$initialViewState);
};
var elm$svg$Svg$circle = elm$svg$Svg$trustedNode('circle');
var elm$svg$Svg$polygon = elm$svg$Svg$trustedNode('polygon');
var elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var feathericons$elm_feather$FeatherIcons$compass = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'compass',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-compass')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$circle,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$cx('12'),
							elm$svg$Svg$Attributes$cy('12'),
							elm$svg$Svg$Attributes$r('10')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$polygon,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76')
						]),
					_List_Nil)
				]))
		]));
var feathericons$elm_feather$FeatherIcons$edit = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'edit',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-edit')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$path,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$d('M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$polygon,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$points('18 2 22 6 12 16 8 16 8 12 18 2')
						]),
					_List_Nil)
				]))
		]));
var feathericons$elm_feather$FeatherIcons$grid = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'grid',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-grid')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$rect,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x('3'),
							elm$svg$Svg$Attributes$y('3'),
							elm$svg$Svg$Attributes$width('7'),
							elm$svg$Svg$Attributes$height('7')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$rect,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x('14'),
							elm$svg$Svg$Attributes$y('3'),
							elm$svg$Svg$Attributes$width('7'),
							elm$svg$Svg$Attributes$height('7')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$rect,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x('14'),
							elm$svg$Svg$Attributes$y('14'),
							elm$svg$Svg$Attributes$width('7'),
							elm$svg$Svg$Attributes$height('7')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$rect,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x('3'),
							elm$svg$Svg$Attributes$y('14'),
							elm$svg$Svg$Attributes$width('7'),
							elm$svg$Svg$Attributes$height('7')
						]),
					_List_Nil)
				]))
		]));
var feathericons$elm_feather$FeatherIcons$list = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'list',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					feathericons$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-list')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('8'),
							elm$svg$Svg$Attributes$y1('6'),
							elm$svg$Svg$Attributes$x2('21'),
							elm$svg$Svg$Attributes$y2('6')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('8'),
							elm$svg$Svg$Attributes$y1('12'),
							elm$svg$Svg$Attributes$x2('21'),
							elm$svg$Svg$Attributes$y2('12')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('8'),
							elm$svg$Svg$Attributes$y1('18'),
							elm$svg$Svg$Attributes$x2('21'),
							elm$svg$Svg$Attributes$y2('18')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('3'),
							elm$svg$Svg$Attributes$y1('6'),
							elm$svg$Svg$Attributes$x2('3'),
							elm$svg$Svg$Attributes$y2('6')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('3'),
							elm$svg$Svg$Attributes$y1('12'),
							elm$svg$Svg$Attributes$x2('3'),
							elm$svg$Svg$Attributes$y2('12')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('3'),
							elm$svg$Svg$Attributes$y1('18'),
							elm$svg$Svg$Attributes$x2('3'),
							elm$svg$Svg$Attributes$y2('18')
						]),
					_List_Nil)
				]))
		]));
var rtfeldman$elm_css$Html$Styled$h1 = rtfeldman$elm_css$Html$Styled$node('h1');
var rtfeldman$elm_css$VirtualDom$Styled$style = F2(
	function (key, val) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$style, key, val),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Attributes$style = rtfeldman$elm_css$VirtualDom$Styled$style;
var author$project$Index$View$view = function (model) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				author$project$Grid$container,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$h1,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text('Form Elements')
							])),
						author$project$Grid$row(
						_List_fromArray(
							[
								A3(
								author$project$Grid$colSizes,
								author$project$Grid$Size$Twelve,
								_List_fromArray(
									[
										_Utils_Tuple2(author$project$Grid$Size$Lg, author$project$Grid$Size$Six)
									]),
								_List_fromArray(
									[
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_Nil,
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Simple text Input')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$InputMsg,
																author$project$Form$Input$render(
																	author$project$Form$Input$view(model.input))),
																A2(
																rtfeldman$elm_css$Html$Styled$div,
																_List_Nil,
																_List_fromArray(
																	[
																		rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + author$project$Form$Input$getValue(model.input))
																	]))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Int Input, accepting only ints!')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$IntInputMsg,
																author$project$Form$IntInput$render(
																	author$project$Form$IntInput$view(model.intInput))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$IntInput$getValue(model.intInput),
																function (_int) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + elm$core$String$fromInt(_int));
																})
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Float Input, accepting only floats!')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$FloatInputMsg,
																author$project$Form$FloatInput$render(
																	author$project$Form$FloatInput$view(model.floatInput))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$FloatInput$getValue(model.floatInput),
																function (_float) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + elm$core$String$fromFloat(_float));
																})
															]))
													]),
												A3(author$project$Card$header, 'Example Inputs', _List_Nil, author$project$Card$view))))
									])),
								A3(
								author$project$Grid$colSizes,
								author$project$Grid$Size$Twelve,
								_List_fromArray(
									[
										_Utils_Tuple2(author$project$Grid$Size$Lg, author$project$Grid$Size$Six)
									]),
								_List_fromArray(
									[
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_Nil,
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Simple Select')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$SelectMsg,
																author$project$Form$Select$render(
																	A2(
																		author$project$Form$Select$setIsOptionDisabled,
																		elm$core$Basics$eq(author$project$Records$MusicGenre$Pop),
																		A2(
																			author$project$Form$Select$setIsClearable,
																			true,
																			A2(author$project$Form$Select$view, author$project$Records$MusicGenre$toLabel, model.select)))))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Multi Select')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$MultiSelectMsg,
																author$project$Form$MultiSelect$render(
																	A2(
																		author$project$Form$MultiSelect$setIsOptionDisabled,
																		elm$core$Basics$eq(author$project$Records$MusicGenre$Pop),
																		A2(author$project$Form$MultiSelect$view, author$project$Records$MusicGenre$toLabel, model.multiSelect))))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Search Select')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$SearchSelectMsg,
																author$project$Form$SearchSelect$render(
																	A2(
																		author$project$Form$SearchSelect$view,
																		function ($) {
																			return $.name;
																		},
																		model.searchSelect))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$SearchSelect$getSelectedOption(model.searchSelect),
																function (country) {
																	return rtfeldman$elm_css$Html$Styled$text('Value: ' + country.name);
																})
															]))
													]),
												A3(author$project$Card$header, 'Example Selects', _List_Nil, author$project$Card$view))))
									])),
								A3(
								author$project$Grid$colSizes,
								author$project$Grid$Size$Twelve,
								_List_fromArray(
									[
										_Utils_Tuple2(author$project$Grid$Size$Lg, author$project$Grid$Size$Six)
									]),
								_List_fromArray(
									[
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_Nil,
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Simple Date Picker (set to Brisbane Time)')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$DatePickerMsg,
																author$project$Form$DatePicker$render(
																	author$project$Form$DatePicker$view(model.datePicker))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$DatePicker$getSelectedPosix(model.datePicker),
																function (posix) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		elm$core$String$fromInt(
																			elm$time$Time$posixToMillis(posix)));
																})
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Date Picker with min and max dates')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$DatePicker2Msg,
																author$project$Form$DatePicker$render(
																	A2(
																		author$project$Form$DatePicker$setMaxPosix,
																		elm$core$Maybe$Just(
																			elm$time$Time$millisToPosix(1588822890 * 1000)),
																		A2(
																			author$project$Form$DatePicker$setMinPosix,
																			elm$core$Maybe$Just(
																				elm$time$Time$millisToPosix(1511822890 * 1000)),
																			A2(
																				author$project$Form$DatePicker$setIsClearable,
																				true,
																				author$project$Form$DatePicker$view(model.datePicker2))))))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Date Time Picker!')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$DatePicker3Msg,
																author$project$Form$DatePicker$render(
																	A2(
																		author$project$Form$DatePicker$setIncludeTime,
																		true,
																		A2(
																			author$project$Form$DatePicker$setIsClearable,
																			true,
																			author$project$Form$DatePicker$view(model.datePicker3)))))
															]))
													]),
												A3(author$project$Card$header, 'Date Pickers!', _List_Nil, author$project$Card$view)))),
										author$project$Card$render(
										A2(
											author$project$Card$body,
											_List_fromArray(
												[
													A2(
													author$project$Card$block,
													author$project$Grid$Size$Six,
													_List_fromArray(
														[
															A2(
															rtfeldman$elm_css$Html$Styled$div,
															_List_fromArray(
																[
																	A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'flex'),
																	A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'flex-direction', 'column'),
																	A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '100%')
																]),
															_List_fromArray(
																[
																	A2(
																	rtfeldman$elm_css$Html$Styled$map,
																	author$project$Index$Msg$TextAreaMsg,
																	author$project$Form$TextArea$render(
																		A2(
																			author$project$Form$TextArea$setPlaceholder,
																			'HELLO I AM A PLACEHOLDER',
																			A2(
																				author$project$Form$TextArea$setShouldWrap,
																				true,
																				author$project$Form$TextArea$view(model.textArea)))))
																]))
														])),
													A2(
													author$project$Card$block,
													author$project$Grid$Size$Six,
													_List_fromArray(
														[
															rtfeldman$elm_css$Html$Styled$text('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')
														]))
												]),
											A3(author$project$Card$header, 'Text Area!', _List_Nil, author$project$Card$view)))
									])),
								A3(
								author$project$Grid$colSizes,
								author$project$Grid$Size$Twelve,
								_List_fromArray(
									[
										_Utils_Tuple2(author$project$Grid$Size$Lg, author$project$Grid$Size$Six)
									]),
								_List_fromArray(
									[
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_Nil,
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Index$Msg$AddGreenToaster,
																	A2(
																		author$project$Button$green,
																		true,
																		A2(author$project$Button$text, 'Add Green Toaster', author$project$Button$view)))),
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Index$Msg$AddRedToaster,
																	A2(
																		author$project$Button$red,
																		true,
																		A2(author$project$Button$text, 'Add Red Toaster', author$project$Button$view))))
															]))
													]),
												A3(author$project$Card$header, 'Toasters', _List_Nil, author$project$Card$view)))),
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_Nil,
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Index$Msg$ToggleSmModal,
																	A2(author$project$Button$text, 'Open Sm Modal', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Index$Msg$ToggleLgModal,
																	A2(author$project$Button$text, 'Open Lg Modal', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Index$Msg$ToggleResizeModal,
																	A2(author$project$Button$text, 'Open Resize Modal', author$project$Button$view))),
																author$project$Modal$render(
																A2(
																	author$project$Modal$footer,
																	_List_Nil,
																	A2(
																		author$project$Modal$body,
																		_List_fromArray(
																			[
																				A2(
																				author$project$Modal$block,
																				author$project$Grid$Size$Twelve,
																				_List_fromArray(
																					[
																						rtfeldman$elm_css$Html$Styled$text('Modal Content')
																					]))
																			]),
																		A3(
																			author$project$Modal$header,
																			'Hi I\'m Sm Modal',
																			_List_Nil,
																			A2(
																				author$project$Modal$setSize,
																				author$project$Grid$Size$Sm,
																				A2(author$project$Modal$viewIf, model.modalSmOpen, author$project$Index$Msg$ToggleSmModal)))))),
																author$project$Modal$render(
																A2(
																	author$project$Modal$footer,
																	_List_fromArray(
																		[
																			A2(
																			author$project$Button$red,
																			true,
																			A2(
																				author$project$Button$onClick,
																				author$project$Index$Msg$ToggleLgModal,
																				A2(author$project$Button$text, 'Cancel', author$project$Button$view))),
																			A2(
																			author$project$Button$green,
																			true,
																			A2(author$project$Button$text, 'Save', author$project$Button$view))
																		]),
																	A2(
																		author$project$Modal$body,
																		_List_fromArray(
																			[
																				A2(
																				author$project$Modal$block,
																				author$project$Grid$Size$Twelve,
																				_List_fromArray(
																					[
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							])),
																						A2(
																						rtfeldman$elm_css$Html$Styled$p,
																						_List_Nil,
																						_List_fromArray(
																							[
																								rtfeldman$elm_css$Html$Styled$text('Modal Content')
																							]))
																					]))
																			]),
																		A3(
																			author$project$Modal$header,
																			'Hi I\'m Lg Modal',
																			_List_Nil,
																			A2(
																				author$project$Modal$setSize,
																				author$project$Grid$Size$Lg,
																				A2(author$project$Modal$viewIf, model.modalLgOpen, author$project$Index$Msg$ToggleLgModal)))))),
																author$project$Modal$render(
																A2(
																	author$project$Modal$body,
																	_List_fromArray(
																		[
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Learning')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/courses'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Courses')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/units'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Units')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/tasks'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Tasks')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/course-schemes'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Course Schemes')
																						]))
																				])),
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Users')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/courses'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Trainer Roles')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/units'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Classes')
																						]))
																				])),
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Skills Profiler')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/courses'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Activity Definitions')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/units'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Descriptions')
																						]))
																				])),
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Apprenticeship Providers')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/courses'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Apprenticeship Providers')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/units'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Field Officers')
																						]))
																				])),
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Finance')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/courses'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Invoices')
																						]))
																				])),
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Avetmiss')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/courses'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Funding Schemes')
																						]))
																				])),
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Schools & Vetis')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Schools')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Vetis Management')
																						]))
																				])),
																			A3(
																			author$project$Modal$blockSizes,
																			author$project$Grid$Size$Twelve,
																			_List_fromArray(
																				[
																					_Utils_Tuple2(author$project$Grid$Size$Xs, author$project$Grid$Size$Six),
																					_Utils_Tuple2(author$project$Grid$Size$Sm, author$project$Grid$Size$Four),
																					_Utils_Tuple2(author$project$Grid$Size$Xl, author$project$Grid$Size$Two)
																				]),
																			_List_fromArray(
																				[
																					A2(
																					rtfeldman$elm_css$Html$Styled$h1,
																					_List_Nil,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Other')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Reports')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Assessment Questions')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Course Descriptors')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Feedback')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Referral Sources')
																						])),
																					A2(
																					rtfeldman$elm_css$Html$Styled$a,
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$Attributes$href('/admin/schools'),
																							A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block')
																						]),
																					_List_fromArray(
																						[
																							rtfeldman$elm_css$Html$Styled$text('Student Course Archival Status')
																						]))
																				]))
																		]),
																	A2(
																		author$project$Modal$setSize,
																		author$project$Grid$Size$Xl,
																		A2(author$project$Modal$viewIf, model.modalResizeOpen, author$project$Index$Msg$ToggleResizeModal))))
															]))
													]),
												A3(author$project$Card$header, 'Modal', _List_Nil, author$project$Card$view)))),
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_Nil,
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Grid$row(
																_List_fromArray(
																	[
																		A2(
																		author$project$Grid$col,
																		author$project$Grid$Size$Six,
																		_List_fromArray(
																			[
																				author$project$Toggle$render(
																				A2(author$project$Toggle$view, model.toggle1, author$project$Index$Msg$Toggle1)),
																				author$project$Toggle$render(
																				A2(
																					author$project$Toggle$label,
																					'Toggle Me',
																					A2(author$project$Toggle$view, model.toggle2, author$project$Index$Msg$Toggle2))),
																				author$project$Toggle$render(
																				A2(
																					author$project$Toggle$label,
																					'Disabled',
																					A2(
																						author$project$Toggle$isDisabled,
																						true,
																						A2(author$project$Toggle$view, model.toggle3, author$project$Index$Msg$DisabledToggle))))
																			]))
																	]))
															]))
													]),
												A3(author$project$Card$header, 'Toggle', _List_Nil, author$project$Card$view))))
									])),
								A3(
								author$project$Grid$colSizes,
								author$project$Grid$Size$Twelve,
								_List_fromArray(
									[
										_Utils_Tuple2(author$project$Grid$Size$Lg, author$project$Grid$Size$Six)
									]),
								_List_fromArray(
									[
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_fromArray(
												[
													A2(author$project$Button$text, 'Footer Button', author$project$Button$view)
												]),
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Twelve,
														_List_fromArray(
															[
																author$project$Button$render(
																A2(author$project$Button$text, 'Normal', author$project$Button$view)),
																author$project$Button$render(
																A2(
																	author$project$Button$isDisabled,
																	true,
																	A2(author$project$Button$text, 'Disabled :(', author$project$Button$view))),
																author$project$Button$render(
																author$project$Button$small(
																	A2(author$project$Button$text, 'Small!', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$green,
																	true,
																	A2(author$project$Button$text, 'Green!', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$red,
																	true,
																	A2(author$project$Button$text, 'Red!', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$isLoading,
																	true,
																	A2(author$project$Button$text, 'Loading!', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$isLoading,
																	true,
																	A2(
																		author$project$Button$green,
																		true,
																		author$project$Button$small(
																			A2(author$project$Button$text, 'Small, green, loading!', author$project$Button$view))))),
																author$project$Button$render(
																A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$calendar, author$project$Button$view)),
																author$project$Button$render(
																A2(
																	author$project$Button$isDisabled,
																	true,
																	A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																author$project$Button$small(
																	A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$green,
																	true,
																	A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$red,
																	true,
																	A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$isLoading,
																	true,
																	A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$text,
																	'Google It',
																	A2(author$project$Button$href, 'http://google.com', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$isDisabled,
																	true,
																	A2(
																		author$project$Button$text,
																		'Google It',
																		A2(author$project$Button$href, 'http://google.com', author$project$Button$view)))),
																author$project$Button$render(
																A2(
																	author$project$Button$green,
																	model.isGridButtonGreen,
																	A2(
																		author$project$Button$onClick,
																		author$project$Index$Msg$SetGridButtonGreen(true),
																		A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$grid, author$project$Button$view)))),
																author$project$Button$render(
																A2(
																	author$project$Button$green,
																	!model.isGridButtonGreen,
																	A2(
																		author$project$Button$onClick,
																		author$project$Index$Msg$SetGridButtonGreen(false),
																		A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$list, author$project$Button$view))))
															]))
													]),
												A3(
													author$project$Card$header,
													'Example Buttons',
													_List_fromArray(
														[
															A2(author$project$Button$text, 'Header Button', author$project$Button$view),
															A2(author$project$Button$text, 'Another Button', author$project$Button$view)
														]),
													author$project$Card$view))))
									])),
								A3(
								author$project$Grid$colSizes,
								author$project$Grid$Size$Twelve,
								_List_fromArray(
									[
										_Utils_Tuple2(author$project$Grid$Size$Lg, author$project$Grid$Size$Six)
									]),
								_List_fromArray(
									[
										author$project$Card$render(
										A2(
											author$project$Card$body,
											_List_fromArray(
												[
													A2(
													author$project$Card$block,
													author$project$Grid$Size$Three,
													_List_fromArray(
														[
															A2(
															rtfeldman$elm_css$Html$Styled$map,
															author$project$Index$Msg$ToolTip1Msg,
															author$project$ToolTip$render(
																A2(
																	author$project$ToolTip$text,
																	'ToolTip1',
																	author$project$ToolTip$view(model.toolTip1))))
														])),
													A2(
													author$project$Card$block,
													author$project$Grid$Size$Three,
													_List_fromArray(
														[
															A2(
															rtfeldman$elm_css$Html$Styled$map,
															author$project$Index$Msg$ToolTip2Msg,
															author$project$ToolTip$render(
																author$project$ToolTip$green(
																	author$project$ToolTip$bottom(
																		A2(
																			author$project$ToolTip$icon,
																			feathericons$elm_feather$FeatherIcons$compass,
																			author$project$ToolTip$view(model.toolTip2))))))
														])),
													A2(
													author$project$Card$block,
													author$project$Grid$Size$Three,
													_List_fromArray(
														[
															A2(
															rtfeldman$elm_css$Html$Styled$map,
															author$project$Index$Msg$ToolTip3Msg,
															author$project$ToolTip$render(
																author$project$ToolTip$blue(
																	author$project$ToolTip$left(
																		A2(
																			author$project$ToolTip$text,
																			'help',
																			author$project$ToolTip$view(model.toolTip3))))))
														])),
													A2(
													author$project$Card$block,
													author$project$Grid$Size$Three,
													_List_fromArray(
														[
															A2(
															rtfeldman$elm_css$Html$Styled$map,
															author$project$Index$Msg$ToolTip4Msg,
															author$project$ToolTip$render(
																author$project$ToolTip$red(
																	author$project$ToolTip$top(
																		A2(
																			author$project$ToolTip$icon,
																			feathericons$elm_feather$FeatherIcons$calendar,
																			author$project$ToolTip$view(model.toolTip4))))))
														]))
												]),
											A3(author$project$Card$header, 'Example ToolTips', _List_Nil, author$project$Card$view)))
									])),
								A3(
								author$project$Grid$colSizes,
								author$project$Grid$Size$Twelve,
								_List_fromArray(
									[
										_Utils_Tuple2(author$project$Grid$Size$Lg, author$project$Grid$Size$Six)
									]),
								_List_fromArray(
									[
										author$project$Card$render(
										A2(
											author$project$Card$footer,
											_List_fromArray(
												[
													A2(
													author$project$Button$text,
													'cancel',
													A2(author$project$Button$red, true, author$project$Button$view)),
													A2(
													author$project$Button$text,
													'save',
													A2(author$project$Button$green, true, author$project$Button$view))
												]),
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Six,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Name'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$UpdateName,
																author$project$Form$Input$render(
																	author$project$Form$Input$view(model.name)))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Six,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Start Date'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$UpdateStartDate,
																author$project$Form$DatePicker$render(
																	author$project$Form$DatePicker$view(model.startDate)))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Six,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Email'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$UpdateEmail,
																author$project$Form$Input$render(
																	author$project$Form$Input$view(model.email)))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Six,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Country of Birth'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$UpdateCountryOfBirth,
																author$project$Form$SearchSelect$render(
																	A2(
																		author$project$Form$SearchSelect$view,
																		function ($) {
																			return $.name;
																		},
																		model.countryOfBirth)))
															])),
														A2(
														author$project$Card$block,
														author$project$Grid$Size$Six,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Preferred Music Genre')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Index$Msg$UpdatePreferredGenre,
																author$project$Form$Select$render(
																	A2(author$project$Form$Select$view, author$project$Records$MusicGenre$toLabel, model.preferredGenre)))
															]))
													]),
												A3(
													author$project$Card$header,
													'User Details',
													_List_fromArray(
														[
															A2(author$project$Button$icon, feathericons$elm_feather$FeatherIcons$edit, author$project$Button$view)
														]),
													author$project$Card$view)))),
										author$project$Card$render(
										A2(
											author$project$Card$body,
											_List_fromArray(
												[
													A2(
													author$project$Card$block,
													author$project$Grid$Size$Six,
													_List_fromArray(
														[
															author$project$Form$Label$render(
															author$project$Form$Label$view('Preferred Music Genre')),
															A2(
															rtfeldman$elm_css$Html$Styled$map,
															author$project$Index$Msg$UpdateMaybeBLockSelect,
															author$project$Form$Select$render(
																A2(
																	author$project$Form$Select$setIsClearable,
																	true,
																	A2(author$project$Form$Select$view, author$project$Records$MusicGenre$toLabel, model.maybeBlockSelect))))
														])),
													A3(
													author$project$Card$maybeBlock,
													author$project$Grid$Size$Six,
													author$project$Form$Select$getSelectedOption(model.maybeBlockSelect),
													author$project$Index$View$maybeBlockView)
												]),
											A3(author$project$Card$header, 'Conditional Blocks', _List_Nil, author$project$Card$view)))
									]))
							]))
					]))
			]));
};
var author$project$Msg$AdminMsg = function (a) {
	return {$: 'AdminMsg', a: a};
};
var author$project$View$page = function (model) {
	var _n0 = model.page;
	switch (_n0.$) {
		case 'NotFound':
			return A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('404 D:')
					]));
		case 'Index':
			var indexModel = _n0.a;
			return A2(
				rtfeldman$elm_css$Html$Styled$map,
				author$project$Msg$IndexMsg,
				author$project$Index$View$view(indexModel));
		case 'Admin':
			var adminPage = _n0.a;
			return A2(
				rtfeldman$elm_css$Html$Styled$map,
				author$project$Msg$AdminMsg,
				author$project$Admin$View$view(adminPage));
		case 'Trainer':
			var trainerPage = _n0.a;
			return _Debug_todo(
				'View',
				{
					start: {line: 90, column: 13},
					end: {line: 90, column: 23}
				})('trainer view');
		default:
			return A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('test')
					]));
	}
};
var author$project$View$body = function (model) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$map,
				author$project$Msg$ToastersMsg,
				author$project$Toasters$view(model.toasters)),
				author$project$View$menu(model.isAdminMenuOpen),
				author$project$View$page(model)
			]));
};
var rtfeldman$elm_css$Html$Styled$toUnstyled = rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var author$project$View$view = function (model) {
	return {
		body: elm$core$List$singleton(
			rtfeldman$elm_css$Html$Styled$toUnstyled(
				author$project$View$body(model))),
		title: 'Title'
	};
};
var elm$browser$Browser$application = _Browser_application;
var author$project$Main$main = elm$browser$Browser$application(
	{
		init: elm$core$Basics$always(author$project$Main$init),
		onUrlChange: author$project$Msg$UrlChange,
		onUrlRequest: author$project$Msg$Navigate,
		subscriptions: author$project$Subscriptions$subscriptions,
		update: author$project$Update$update,
		view: author$project$View$view
	});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))({"versions":{"elm":"0.19.0"},"types":{"message":"Msg.Msg","aliases":{"Url.Url":{"args":[],"type":"{ protocol : Url.Protocol, host : String.String, port_ : Maybe.Maybe Basics.Int, path : String.String, query : Maybe.Maybe String.String, fragment : Maybe.Maybe String.String }"},"Form.DatePicker.Msg":{"args":[],"type":"Form.DatePicker.Internal.Msg"},"Form.FloatInput.Msg":{"args":[],"type":"Form.FloatInput.Internal.Msg"},"Form.Input.Msg":{"args":[],"type":"Form.Input.Internal.Msg"},"Form.IntInput.Msg":{"args":[],"type":"Form.IntInput.Internal.Msg"},"Form.MultiSelect.Msg":{"args":["option"],"type":"Form.MultiSelect.Internal.Msg option"},"Form.SearchSelect.Msg":{"args":["option"],"type":"Form.SearchSelect.Internal.Msg option"},"Form.Select.Msg":{"args":["option"],"type":"Form.Select.Internal.Msg option"},"Form.TextArea.Msg":{"args":[],"type":"Form.TextArea.Internal.Msg"},"Records.Country.Country":{"args":[],"type":"{ name : String.String, altSpellings : List.List String.String, capital : String.String, region : String.String, population : Basics.Int }"},"Form.DatePicker.Internal.IncludeTime":{"args":[],"type":"Basics.Bool"},"Form.DatePicker.Internal.MaxPosix":{"args":[],"type":"Maybe.Maybe Time.Posix"},"Form.DatePicker.Internal.MinPosix":{"args":[],"type":"Maybe.Maybe Time.Posix"},"Toasters.Internal.Toaster":{"args":[],"type":"{ color : Toasters.Color.Color, message : String.String, ticks : Basics.Int }"},"Http.Response":{"args":["body"],"type":"{ url : String.String, status : { code : Basics.Int, message : String.String }, headers : Dict.Dict String.String String.String, body : body }"}},"unions":{"Msg.Msg":{"args":[],"tags":{"UrlChange":["Url.Url"],"Navigate":["Browser.UrlRequest"],"ToastersMsg":["Toasters.Msg"],"ToggleAdminMenu":[],"IndexMsg":["Index.Msg.Msg"],"AdminMsg":["Admin.Msg.Msg"],"TrainerMsg":["Trainer.Msg.Msg"]}},"Admin.Msg.Msg":{"args":[],"tags":{"NoOp":[]}},"Index.Msg.Msg":{"args":[],"tags":{"AddGreenToaster":[],"AddRedToaster":[],"InputMsg":["Form.Input.Msg"],"IntInputMsg":["Form.IntInput.Msg"],"FloatInputMsg":["Form.FloatInput.Msg"],"SelectMsg":["Form.Select.Msg Records.MusicGenre.MusicGenre"],"MultiSelectMsg":["Form.MultiSelect.Msg Records.MusicGenre.MusicGenre"],"SearchSelectMsg":["Form.SearchSelect.Msg Records.Country.Country"],"DatePickerMsg":["Form.DatePicker.Msg"],"DatePicker2Msg":["Form.DatePicker.Msg"],"DatePicker3Msg":["Form.DatePicker.Msg"],"TextAreaMsg":["Form.TextArea.Msg"],"TextAreaWrapMsg":["Form.TextArea.Msg"],"ToolTip1Msg":["ToolTip.Msg"],"ToolTip2Msg":["ToolTip.Msg"],"ToolTip3Msg":["ToolTip.Msg"],"ToolTip4Msg":["ToolTip.Msg"],"UpdateName":["Form.Input.Msg"],"UpdateStartDate":["Form.DatePicker.Msg"],"UpdateEmail":["Form.Input.Msg"],"UpdatePreferredGenre":["Form.Select.Msg Records.MusicGenre.MusicGenre"],"UpdateCountryOfBirth":["Form.SearchSelect.Msg Records.Country.Country"],"Toggle1":[],"Toggle2":[],"DisabledToggle":[],"ToggleSmModal":[],"ToggleLgModal":[],"ToggleResizeModal":[],"UpdateMaybeBLockSelect":["Form.Select.Msg Records.MusicGenre.MusicGenre"],"SetGridButtonGreen":["Basics.Bool"]}},"Toasters.Msg":{"args":[],"tags":{"InternalMsg":["Toasters.Internal.Msg"]}},"Trainer.Msg.Msg":{"args":[],"tags":{"NoOp":[]}},"Browser.UrlRequest":{"args":[],"tags":{"Internal":["Url.Url"],"External":["String.String"]}},"Basics.Int":{"args":[],"tags":{"Int":[]}},"Maybe.Maybe":{"args":["a"],"tags":{"Just":["a"],"Nothing":[]}},"String.String":{"args":[],"tags":{"String":[]}},"Url.Protocol":{"args":[],"tags":{"Http":[],"Https":[]}},"Form.DatePicker.Internal.Msg":{"args":[],"tags":{"Open":["Form.DatePicker.Internal.MinPosix","Form.DatePicker.Internal.MaxPosix","Form.DatePicker.Internal.IncludeTime"],"Blur":[],"InitWithCurrentDate":["Form.DatePicker.Internal.MinPosix","Form.DatePicker.Internal.MaxPosix","Time.Posix"],"PreviousYear":["Form.DatePicker.Internal.MinPosix"],"PreviousMonth":[],"NextYear":["Form.DatePicker.Internal.MaxPosix"],"NextMonth":[],"SelectDay":["Time.Posix","Form.DatePicker.Internal.IncludeTime"],"OpenTimeSelect":["Form.DatePicker.Internal.TimeSelect"],"UpdateHours":["Form.Select.Msg Basics.Int"],"UpdateMinutes":["Form.Select.Msg Basics.Int"],"UpdateSeconds":["Form.Select.Msg Basics.Int"],"Apply":[],"Clear":[],"DomFocus":["Result.Result Browser.Dom.Error ()"],"NoOp":[]}},"Form.FloatInput.Internal.Msg":{"args":[],"tags":{"Input":["String.String"]}},"Form.Input.Internal.Msg":{"args":[],"tags":{"Input":["String.String"]}},"Form.IntInput.Internal.Msg":{"args":[],"tags":{"Input":["String.String"]}},"Form.MultiSelect.Internal.Msg":{"args":["option"],"tags":{"Open":[],"Blur":[],"Select":["option"],"Clear":[],"SelectKey":["option -> Basics.Bool","Form.Helpers.SelectKey"],"NoOp":[]}},"Form.SearchSelect.Internal.Msg":{"args":["option"],"tags":{"Open":[],"Blur":[],"UpdateSearchInput":["Basics.Int","String.String"],"Response":["Result.Result Http.Error (List.List option)"],"Select":["option"],"Clear":[],"SelectKey":["Form.Helpers.SelectKey"]}},"Form.Select.Internal.Msg":{"args":["option"],"tags":{"Open":[],"Blur":[],"Select":["option"],"Clear":[],"SelectKey":["option -> Basics.Bool","option -> String.String","Form.Helpers.SelectKey"],"NoOp":[]}},"Form.TextArea.Internal.Msg":{"args":[],"tags":{"Input":["String.String"]}},"Records.MusicGenre.MusicGenre":{"args":[],"tags":{"Rock":[],"Metal":[],"Blues":[],"Jazz":[],"Pop":[],"BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop":[]}},"Toasters.Internal.Msg":{"args":[],"tags":{"Tick":[],"Close":["Toasters.Internal.Toaster"]}},"ToolTip.Msg":{"args":[],"tags":{"MouseEnter":[],"MouseLeave":[]}},"Basics.Bool":{"args":[],"tags":{"True":[],"False":[]}},"List.List":{"args":["a"],"tags":{}},"Form.DatePicker.Internal.TimeSelect":{"args":[],"tags":{"Hours":[],"Minutes":[],"Seconds":[]}},"Form.Helpers.SelectKey":{"args":[],"tags":{"Up":[],"Down":[],"Enter":[],"Space":[],"Backspace":[],"AlphaNum":["String.String"]}},"Toasters.Color.Color":{"args":[],"tags":{"Green":[],"Red":[]}},"Browser.Dom.Error":{"args":[],"tags":{"NotFound":["String.String"]}},"Result.Result":{"args":["error","value"],"tags":{"Ok":["value"],"Err":["error"]}},"Http.Error":{"args":[],"tags":{"BadUrl":["String.String"],"Timeout":[],"NetworkError":[],"BadStatus":["Http.Response String.String"],"BadPayload":["String.String","Http.Response String.String"]}},"Time.Posix":{"args":[],"tags":{"Posix":["Basics.Int"]}},"Dict.Dict":{"args":["k","v"],"tags":{"RBNode_elm_builtin":["Dict.NColor","k","v","Dict.Dict k v","Dict.Dict k v"],"RBEmpty_elm_builtin":[]}},"Dict.NColor":{"args":[],"tags":{"Red":[],"Black":[]}}}}})}});}(this));