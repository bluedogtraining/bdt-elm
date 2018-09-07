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




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.b1.a0 === region.cu.a0)
	{
		return 'on line ' + region.b1.a0;
	}
	return 'on lines ' + region.b1.a0 + ' through ' + region.cu.a0;
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




/**_UNUSED/
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
		impl.dP,
		impl.ea,
		impl.d8,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
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
		bT: func(record.bT),
		b2: record.b2,
		b$: record.b$
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
		var message = !tag ? value : tag < 3 ? value.a : value.bT;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.b2;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.b$) && event.preventDefault(),
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



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dP,
		impl.ea,
		impl.d8,
		function(sendToApp, initialModel) {
			var view = impl.ec;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.dP,
		impl.ea,
		impl.d8,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.a4 && impl.a4(sendToApp)
			var view = impl.ec;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.dx);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.d9) && (_VirtualDom_doc.title = title = doc.d9);
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
	var onUrlChange = impl.dX;
	var onUrlRequest = impl.dY;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		a4: function(sendToApp)
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
							&& curr.c_ === next.c_
							&& curr.cC === next.cC
							&& curr.cV.a === next.cV.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		dP: function(flags)
		{
			return A3(impl.dP, flags, _Browser_getUrl(), key);
		},
		ec: impl.ec,
		ea: impl.ea,
		d8: impl.d8
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
		? { dK: 'hidden', aP: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dK: 'mozHidden', aP: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dK: 'msHidden', aP: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dK: 'webkitHidden', aP: 'webkitvisibilitychange' }
		: { dK: 'hidden', aP: 'visibilitychange' };
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
		c5: _Browser_getScene(),
		$7: {
			bJ: _Browser_window.pageXOffset,
			bK: _Browser_window.pageYOffset,
			aK: _Browser_doc.documentElement.clientWidth,
			au: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aK: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		au: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			c5: {
				aK: node.scrollWidth,
				au: node.scrollHeight
			},
			$7: {
				bJ: node.scrollLeft,
				bK: node.scrollTop,
				aK: node.clientWidth,
				au: node.clientHeight
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
			c5: _Browser_getScene(),
			$7: {
				bJ: x,
				bK: y,
				aK: _Browser_doc.documentElement.clientWidth,
				au: _Browser_doc.documentElement.clientHeight
			},
			dG: {
				bJ: x + rect.left,
				bK: y + rect.top,
				aK: rect.width,
				au: rect.height
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


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.cQ) { flags += 'm'; }
	if (options.cj) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;



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
			callback(_Http_handleResponse(xhr, request.bN.a));
		});

		try
		{
			xhr.open(request.bV, request.aI, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.aI)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.dx;
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
			dy: event.loaded,
			dz: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.bp; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.bN.b;
	xhr.withCredentials = request.b7;

	elm$core$Maybe$isJust(request.b5) && (xhr.timeout = request.b5.a);
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
		aI: xhr.responseURL,
		d6: { dC: xhr.status, bT: xhr.statusText },
		bp: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		dx: xhr.response
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
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
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
var elm$core$List$cons = _List_cons;
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
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
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
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
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
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.m) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.o),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.o);
		} else {
			var treeLen = builder.m * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.p) : builder.p;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.m);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.o) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.o);
		}
	});
var elm$core$Basics$False = 1;
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
					{p: nodeList, m: (len / elm$core$Array$branchFactor) | 0, o: tail});
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
var elm$core$Basics$le = _Utils_le;
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
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
var author$project$Countries$Country = F5(
	function (name, altSpellings, capital, region, population) {
		return {dt: altSpellings, dA: capital, dV: name, d$: population, d1: region};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Countries$countryDecoder = A3(
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
					elm$json$Json$Decode$succeed(author$project$Countries$Country))))));
var author$project$Form$DatePicker$Model = elm$core$Basics$identity;
var author$project$Form$Select$Model = elm$core$Basics$identity;
var author$project$Resettable$Initial = function (a) {
	return {$: 0, a: a};
};
var author$project$Resettable$init = author$project$Resettable$Initial;
var author$project$Form$Select$Internal$init = function (options) {
	return {
		A: elm$core$Maybe$Nothing,
		Q: false,
		a2: options,
		k: author$project$Resettable$init(elm$core$Maybe$Nothing)
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
var author$project$Form$Select$init = A2(elm$core$Basics$composeR, author$project$Form$Select$Internal$init, elm$core$Basics$identity);
var author$project$Form$Select$Internal$setInitialOption = F2(
	function (selectedOption, state) {
		return _Utils_update(
			state,
			{
				k: author$project$Resettable$init(selectedOption)
			});
	});
var author$project$Form$Select$setInitialOption = F2(
	function (selectedOption, _n0) {
		var state = _n0;
		return A2(author$project$Form$Select$Internal$setInitialOption, selectedOption, state);
	});
var mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Form$DatePicker$Internal$init = function () {
	var seconds = A2(
		author$project$Form$Select$setInitialOption,
		elm$core$Maybe$Just(0),
		author$project$Form$Select$init(
			A2(
				mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				0,
				A2(elm$core$List$range, 1, 59))));
	var minutes = A2(
		author$project$Form$Select$setInitialOption,
		elm$core$Maybe$Just(0),
		author$project$Form$Select$init(
			A2(
				mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				0,
				A2(elm$core$List$range, 1, 59))));
	var hours = A2(
		author$project$Form$Select$setInitialOption,
		elm$core$Maybe$Just(0),
		author$project$Form$Select$init(
			A2(
				mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				0,
				A2(elm$core$List$range, 1, 23))));
	return {
		W: elm$core$Maybe$Nothing,
		q: elm$core$Maybe$Nothing,
		dL: hours,
		Q: false,
		dU: minutes,
		r: elm$core$Maybe$Nothing,
		d5: seconds,
		g: author$project$Resettable$init(elm$core$Maybe$Nothing)
	};
}();
var author$project$Form$DatePicker$init = author$project$Form$DatePicker$Internal$init;
var author$project$Form$FloatInput$Model = elm$core$Basics$identity;
var author$project$Form$FloatInput$Internal$init = {
	bi: 0,
	bl: 0,
	s: author$project$Resettable$init('')
};
var author$project$Form$FloatInput$init = author$project$Form$FloatInput$Internal$init;
var author$project$Form$Input$Model = elm$core$Basics$identity;
var author$project$Form$Input$Internal$init = {
	s: author$project$Resettable$init('')
};
var author$project$Form$Input$init = author$project$Form$Input$Internal$init;
var author$project$Form$IntInput$Model = elm$core$Basics$identity;
var author$project$Form$IntInput$Internal$init = {
	bi: 0,
	s: author$project$Resettable$init('')
};
var author$project$Form$IntInput$init = author$project$Form$IntInput$Internal$init;
var author$project$Form$MultiSelect$Model = elm$core$Basics$identity;
var author$project$Form$MultiSelect$Internal$init = function (options) {
	return {
		A: elm$core$Maybe$Nothing,
		Q: false,
		a2: options,
		h: author$project$Resettable$init(_List_Nil)
	};
};
var author$project$Form$MultiSelect$init = A2(elm$core$Basics$composeR, author$project$Form$MultiSelect$Internal$init, elm$core$Basics$identity);
var author$project$Form$SearchSelect$Model = elm$core$Basics$identity;
var author$project$Form$SearchSelect$Internal$init = F2(
	function (searchUrl, optionDecoder) {
		return {
			A: elm$core$Maybe$Nothing,
			Z: '',
			Q: false,
			av: false,
			bY: optionDecoder,
			a2: _List_Nil,
			b0: searchUrl,
			k: author$project$Resettable$init(elm$core$Maybe$Nothing)
		};
	});
var author$project$Form$SearchSelect$init = F2(
	function (searchUrl, optionDecoder) {
		return A2(author$project$Form$SearchSelect$Internal$init, searchUrl, optionDecoder);
	});
var author$project$Form$TextArea$Model = elm$core$Basics$identity;
var author$project$Form$TextArea$Internal$init = {
	bB: _List_Nil,
	a7: false,
	s: author$project$Resettable$init('')
};
var author$project$Form$TextArea$init = author$project$Form$TextArea$Internal$init;
var author$project$Form$TextArea$Internal$setReplacements = F2(
	function (replacements, state) {
		return _Utils_update(
			state,
			{bB: replacements});
	});
var author$project$Form$TextArea$setReplacements = F2(
	function (replacements, _n0) {
		var state = _n0;
		return A2(author$project$Form$TextArea$Internal$setReplacements, replacements, state);
	});
var author$project$Form$TextArea$Internal$setSubstituteTabs = F2(
	function (substituteTabs, state) {
		return _Utils_update(
			state,
			{a7: substituteTabs});
	});
var author$project$Form$TextArea$setSubstituteTabs = F2(
	function (bool, _n0) {
		var state = _n0;
		return A2(author$project$Form$TextArea$Internal$setSubstituteTabs, bool, state);
	});
var author$project$MusicGenre$BlackenedHeavyProgressiveAlternativeNewAgeRockabillyGlamCoreRetroFolkNeoSoulAcidFunkDooWopElectricalDreamPop = 5;
var author$project$MusicGenre$Blues = 2;
var author$project$MusicGenre$Jazz = 3;
var author$project$MusicGenre$Metal = 1;
var author$project$MusicGenre$Pop = 4;
var author$project$MusicGenre$Rock = 0;
var author$project$MusicGenre$asNonempty = A2(
	mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	0,
	_List_fromArray(
		[1, 2, 3, 4, 5]));
var author$project$Toasters$Model = elm$core$Basics$identity;
var author$project$Toasters$init = _List_Nil;
var author$project$Model$initialModel = {
	cn: A2(author$project$Form$SearchSelect$init, 'https://restcountries.eu/rest/v2/name/', author$project$Countries$countryDecoder),
	co: author$project$Form$DatePicker$init,
	cp: author$project$Form$DatePicker$init,
	cq: author$project$Form$DatePicker$init,
	ct: author$project$Form$Input$init,
	cz: author$project$Form$FloatInput$init,
	Z: author$project$Form$Input$init,
	cH: author$project$Form$IntInput$init,
	cL: author$project$Form$Select$init(author$project$MusicGenre$asNonempty),
	cM: false,
	cN: false,
	cP: author$project$Form$MultiSelect$init(author$project$MusicGenre$asNonempty),
	dV: author$project$Form$Input$init,
	cW: author$project$Form$Select$init(author$project$MusicGenre$asNonempty),
	c6: A2(author$project$Form$SearchSelect$init, 'https://restcountries.eu/rest/v2/name/', author$project$Countries$countryDecoder),
	c7: author$project$Form$Select$init(author$project$MusicGenre$asNonempty),
	dc: author$project$Form$DatePicker$init,
	df: A2(
		author$project$Form$TextArea$setReplacements,
		_List_fromArray(
			[
				_Utils_Tuple2('[]', '☐')
			]),
		A2(author$project$Form$TextArea$setSubstituteTabs, true, author$project$Form$TextArea$init)),
	dh: author$project$Toasters$init,
	di: false,
	dj: false,
	dk: false
};
var author$project$Msg$ToastersMsg = function (a) {
	return {$: 0, a: a};
};
var author$project$Toasters$Internal$Tick = {$: 0};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {cZ: processes, de: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
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
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 1) {
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
var elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
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
		var processes = _n0.cZ;
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
				elm$core$Task$succeed(0)));
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
var elm$core$Platform$sendToApp = _Platform_sendToApp;
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
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.de);
		if (_n0.$ === 1) {
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
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
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
	var toasters = _n0;
	return author$project$Toasters$Internal$subscription(toasters);
};
var elm$core$Platform$Sub$map = _Platform_map;
var author$project$Subscriptions$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(
				elm$core$Platform$Sub$map,
				author$project$Msg$ToastersMsg,
				author$project$Toasters$subscription(model.dh))
			]));
};
var justinmimbs$date$Date$toRataDie = function (_n0) {
	var rd = _n0;
	return rd;
};
var author$project$Form$DatePicker$Helpers$clamp = F3(
	function (minDate, maxDate, date) {
		return (_Utils_cmp(
			justinmimbs$date$Date$toRataDie(date),
			justinmimbs$date$Date$toRataDie(minDate)) < 0) ? minDate : ((_Utils_cmp(
			justinmimbs$date$Date$toRataDie(date),
			justinmimbs$date$Date$toRataDie(maxDate)) > 0) ? maxDate : date);
	});
var author$project$Form$DatePicker$Helpers$maybeClamp = F3(
	function (maybeMinDate, maybeMaxDate, date) {
		var _n0 = _Utils_Tuple2(maybeMinDate, maybeMaxDate);
		if (!_n0.a.$) {
			if (!_n0.b.$) {
				var minDate = _n0.a.a;
				var maxDate = _n0.b.a;
				return A3(author$project$Form$DatePicker$Helpers$clamp, minDate, maxDate, date);
			} else {
				var minDate = _n0.a.a;
				return A3(author$project$Form$DatePicker$Helpers$clamp, minDate, date, date);
			}
		} else {
			if (!_n0.b.$) {
				var maxDate = _n0.b.a;
				return A3(author$project$Form$DatePicker$Helpers$clamp, date, maxDate, date);
			} else {
				return date;
			}
		}
	});
var justinmimbs$date$Date$Months = 1;
var justinmimbs$date$Date$RD = elm$core$Basics$identity;
var justinmimbs$date$Date$RataDie$Days = 3;
var justinmimbs$date$Date$RataDie$Months = 1;
var justinmimbs$date$Date$RataDie$Weeks = 2;
var justinmimbs$date$Date$RataDie$Years = 0;
var justinmimbs$date$Date$exportUnit = function (unit) {
	switch (unit) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$Basics$neq = _Utils_notEqual;
var justinmimbs$date$Date$RataDie$isLeapYear = function (y) {
	return ((!A2(elm$core$Basics$modBy, 4, y)) && A2(elm$core$Basics$modBy, 100, y)) || (!A2(elm$core$Basics$modBy, 400, y));
};
var justinmimbs$date$Date$RataDie$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = justinmimbs$date$Date$RataDie$isLeapYear(y) ? 1 : 0;
		switch (m) {
			case 0:
				return 0;
			case 1:
				return 31;
			case 2:
				return 59 + leapDays;
			case 3:
				return 90 + leapDays;
			case 4:
				return 120 + leapDays;
			case 5:
				return 151 + leapDays;
			case 6:
				return 181 + leapDays;
			case 7:
				return 212 + leapDays;
			case 8:
				return 243 + leapDays;
			case 9:
				return 273 + leapDays;
			case 10:
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var justinmimbs$date$Date$RataDie$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
	return (365 * y) + leapYears;
};
var justinmimbs$date$Date$RataDie$daysInMonth = F2(
	function (y, m) {
		switch (m) {
			case 0:
				return 31;
			case 1:
				return justinmimbs$date$Date$RataDie$isLeapYear(y) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var justinmimbs$date$Date$RataDie$monthToNumber = function (m) {
	switch (m) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var elm$time$Time$Apr = 3;
var elm$time$Time$Aug = 7;
var elm$time$Time$Dec = 11;
var elm$time$Time$Feb = 1;
var elm$time$Time$Jan = 0;
var elm$time$Time$Jul = 6;
var elm$time$Time$Jun = 5;
var elm$time$Time$Mar = 2;
var elm$time$Time$May = 4;
var elm$time$Time$Nov = 10;
var elm$time$Time$Oct = 9;
var elm$time$Time$Sep = 8;
var justinmimbs$date$Date$RataDie$numberToMonth = function (mn) {
	var _n0 = A2(elm$core$Basics$max, 1, mn);
	switch (_n0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return 6;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return 9;
		case 11:
			return 10;
		default:
			return 11;
	}
};
var justinmimbs$date$Date$RataDie$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2(justinmimbs$date$Date$RataDie$daysInMonth, y, m);
			var mn = justinmimbs$date$Date$RataDie$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = justinmimbs$date$Date$RataDie$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {cr: d, cO: m, dr: y};
			}
		}
	});
var justinmimbs$date$Date$RataDie$divideInt = F2(
	function (a, b) {
		return _Utils_Tuple2((a / b) | 0, a % b);
	});
var justinmimbs$date$Date$RataDie$year = function (rd) {
	var _n0 = A2(justinmimbs$date$Date$RataDie$divideInt, rd, 146097);
	var n400 = _n0.a;
	var r400 = _n0.b;
	var _n1 = A2(justinmimbs$date$Date$RataDie$divideInt, r400, 36524);
	var n100 = _n1.a;
	var r100 = _n1.b;
	var _n2 = A2(justinmimbs$date$Date$RataDie$divideInt, r100, 1461);
	var n4 = _n2.a;
	var r4 = _n2.b;
	var _n3 = A2(justinmimbs$date$Date$RataDie$divideInt, r4, 365);
	var n1 = _n3.a;
	var r1 = _n3.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var justinmimbs$date$Date$RataDie$toOrdinalDate = function (rd) {
	var y = justinmimbs$date$Date$RataDie$year(rd);
	return {
		bZ: rd - justinmimbs$date$Date$RataDie$daysBeforeYear(y),
		dr: y
	};
};
var justinmimbs$date$Date$RataDie$toCalendarDate = function (rd) {
	var date = justinmimbs$date$Date$RataDie$toOrdinalDate(rd);
	return A3(justinmimbs$date$Date$RataDie$toCalendarDateHelp, date.dr, 0, date.bZ);
};
var justinmimbs$date$Date$RataDie$add = F3(
	function (unit, n, rd) {
		switch (unit) {
			case 0:
				return A3(justinmimbs$date$Date$RataDie$add, 1, 12 * n, rd);
			case 1:
				var date = justinmimbs$date$Date$RataDie$toCalendarDate(rd);
				var wholeMonths = (((12 * (date.dr - 1)) + justinmimbs$date$Date$RataDie$monthToNumber(date.cO)) - 1) + n;
				var m = justinmimbs$date$Date$RataDie$numberToMonth(
					A2(elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = ((wholeMonths / 12) | 0) + 1;
				return (justinmimbs$date$Date$RataDie$daysBeforeYear(y) + A2(justinmimbs$date$Date$RataDie$daysBeforeMonth, y, m)) + A2(
					elm$core$Basics$min,
					date.cr,
					A2(justinmimbs$date$Date$RataDie$daysInMonth, y, m));
			case 2:
				return rd + (7 * n);
			default:
				return rd + n;
		}
	});
var justinmimbs$date$Date$add = F3(
	function (unit, n, _n0) {
		var rd = _n0;
		return A3(
			justinmimbs$date$Date$RataDie$add,
			justinmimbs$date$Date$exportUnit(unit),
			n,
			rd);
	});
var author$project$Form$DatePicker$Helpers$nextMonth = function (date) {
	return A3(justinmimbs$date$Date$add, 1, 1, date);
};
var author$project$Form$DatePicker$Helpers$nextYear = function (date) {
	return A3(justinmimbs$date$Date$add, 1, 12, date);
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$Form$DatePicker$Helpers$previousMonth = function (date) {
	return A3(justinmimbs$date$Date$add, 1, -1, date);
};
var author$project$Form$DatePicker$Helpers$previousYear = function (date) {
	return A3(justinmimbs$date$Date$add, 1, -12, date);
};
var author$project$Form$DatePicker$Internal$DomFocus = function (a) {
	return {$: 14, a: a};
};
var author$project$Form$DatePicker$Internal$Hours = 0;
var author$project$Form$DatePicker$Internal$Minutes = 1;
var author$project$Form$DatePicker$Internal$Seconds = 2;
var author$project$Form$DatePicker$Internal$UpdateHours = function (a) {
	return {$: 9, a: a};
};
var author$project$Form$DatePicker$Internal$UpdateMinutes = function (a) {
	return {$: 10, a: a};
};
var author$project$Form$DatePicker$Internal$UpdateSeconds = function (a) {
	return {$: 11, a: a};
};
var author$project$Form$DatePicker$Internal$initNavigationDate = F3(
	function (minDate, maxDate, date) {
		return elm$core$Maybe$Just(
			A3(author$project$Form$DatePicker$Helpers$maybeClamp, minDate, maxDate, date));
	});
var author$project$Form$DatePicker$Internal$InitWithCurrentDate = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$init = elm$core$Task$succeed(0);
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
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
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
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$time$Time$here = _Time_here(0);
var elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return elm$core$Basics$floor(numerator / denominator);
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0;
	return millis;
};
var elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.b1, posixMinutes) < 0) {
					return posixMinutes + era.a;
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
var elm$core$Basics$ge = _Utils_ge;
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
		cr: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		cO: month,
		dr: year + ((month <= 2) ? 1 : 0)
	};
};
var elm$time$Time$toDay = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).cr;
	});
var elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _n0 = elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).cO;
		switch (_n0) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 3:
				return 2;
			case 4:
				return 3;
			case 5:
				return 4;
			case 6:
				return 5;
			case 7:
				return 6;
			case 8:
				return 7;
			case 9:
				return 8;
			case 10:
				return 9;
			case 11:
				return 10;
			default:
				return 11;
		}
	});
var elm$time$Time$toYear = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).dr;
	});
var elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var justinmimbs$date$Date$RataDie$fromCalendarDate = F3(
	function (y, m, d) {
		return (justinmimbs$date$Date$RataDie$daysBeforeYear(y) + A2(justinmimbs$date$Date$RataDie$daysBeforeMonth, y, m)) + A3(
			elm$core$Basics$clamp,
			1,
			A2(justinmimbs$date$Date$RataDie$daysInMonth, y, m),
			d);
	});
var justinmimbs$date$Date$RataDie$today = A3(
	elm$core$Task$map2,
	F2(
		function (currentTime, currentOffset) {
			return A3(
				justinmimbs$date$Date$RataDie$fromCalendarDate,
				A2(elm$time$Time$toYear, currentOffset, currentTime),
				A2(elm$time$Time$toMonth, currentOffset, currentTime),
				A2(elm$time$Time$toDay, currentOffset, currentTime));
		}),
	elm$time$Time$now,
	elm$time$Time$here);
var justinmimbs$date$Date$today = A2(elm$core$Task$map, elm$core$Basics$identity, justinmimbs$date$Date$RataDie$today);
var author$project$Form$DatePicker$Internal$openCmd = F4(
	function (date, minDate, maxDate, includeTime) {
		if (date.$ === 1) {
			return A2(
				elm$core$Task$perform,
				A2(author$project$Form$DatePicker$Internal$InitWithCurrentDate, minDate, maxDate),
				justinmimbs$date$Date$today);
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$json$Json$Decode$map = _Json_map1;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {cA: fragment, cC: host, cT: path, cV: port_, c_: protocol, c$: query};
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
					if (_n1.$ === 1) {
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
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Dom$focus = _Browser_call('focus');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
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
					task)));
	});
var author$project$Form$DatePicker$Internal$openTimeSelect = function (timeSelect) {
	switch (timeSelect) {
		case 0:
			return A2(
				elm$core$Task$attempt,
				author$project$Form$DatePicker$Internal$DomFocus,
				elm$browser$Browser$Dom$focus('FORM_DATEPICKER_HOURS'));
		case 1:
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
	return $.Q;
};
var author$project$Form$Select$getIsOpen = function (_n0) {
	var state = _n0;
	return author$project$Form$Select$Internal$getIsOpen(state);
};
var author$project$Form$Helpers$toHtmlId = F2(
	function (toLabel, option) {
		return toLabel(option);
	});
var author$project$Form$Helpers$focusOption = F3(
	function (toLabel, mOption, msg) {
		if (!mOption.$) {
			var option = mOption.a;
			return A2(
				elm$core$Task$attempt,
				msg,
				elm$browser$Browser$Dom$focus(
					A2(author$project$Form$Helpers$toHtmlId, toLabel, option)));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
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
var author$project$Form$Helpers$getNextOption = F2(
	function (options, focusedOption) {
		return elm$core$List$head(
			A2(
				elm$core$List$drop,
				1,
				A2(
					elm_community$list_extra$List$Extra$dropWhile,
					function (option) {
						return _Utils_eq(
							elm$core$Maybe$Just(option),
							focusedOption);
					},
					options)));
	});
var author$project$Form$Helpers$getPreviousOption = F2(
	function (options, focusedOption) {
		return A2(
			author$project$Form$Helpers$getNextOption,
			elm$core$List$reverse(options),
			focusedOption);
	});
var author$project$Form$Select$Internal$DomFocus = function (a) {
	return {$: 7, a: a};
};
var author$project$Resettable$Updated = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Resettable$update = F2(
	function (newValue, resettable) {
		if (!resettable.$) {
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
var mgold$elm_nonempty_list$List$Nonempty$toList = function (_n0) {
	var x = _n0.a;
	var xs = _n0.b;
	return A2(elm$core$List$cons, x, xs);
};
var author$project$Form$Select$Internal$update = F2(
	function (msg, state) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{Q: true}),
					elm$core$Platform$Cmd$none);
			case 1:
				var _n1 = state.A;
				if (_n1.$ === 1) {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: elm$core$Maybe$Nothing, Q: false}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
				}
			case 2:
				var option = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							A: elm$core$Maybe$Nothing,
							Q: false,
							k: A2(
								author$project$Resettable$update,
								elm$core$Maybe$Just(option),
								state.k)
						}),
					elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							k: A2(author$project$Resettable$update, elm$core$Maybe$Nothing, state.k)
						}),
					elm$core$Platform$Cmd$none);
			case 4:
				if (!msg.b) {
					var toLabel = msg.a;
					var _n2 = msg.b;
					var newFocusedOption = A2(
						author$project$Form$Helpers$getPreviousOption,
						mgold$elm_nonempty_list$List$Nonempty$toList(state.a2),
						state.A);
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: newFocusedOption}),
						A3(author$project$Form$Helpers$focusOption, toLabel, newFocusedOption, author$project$Form$Select$Internal$DomFocus));
				} else {
					var toLabel = msg.a;
					var _n3 = msg.b;
					var newFocusedOption = A2(
						author$project$Form$Helpers$getNextOption,
						mgold$elm_nonempty_list$List$Nonempty$toList(state.a2),
						state.A);
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: newFocusedOption}),
						A3(author$project$Form$Helpers$focusOption, toLabel, newFocusedOption, author$project$Form$Select$Internal$DomFocus));
				}
			case 5:
				var option = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							A: elm$core$Maybe$Just(option)
						}),
					elm$core$Platform$Cmd$none);
			case 6:
				var option = msg.a;
				var _n4 = _Utils_eq(
					state.A,
					elm$core$Maybe$Just(option));
				if (_n4) {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: elm$core$Maybe$Nothing, Q: false}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
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
		var state = _n0;
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Basics$identity,
			A2(author$project$Form$Select$Internal$update, msg, state));
	});
var author$project$Resettable$getValue = function (resettable) {
	if (!resettable.$) {
		var initialValue = resettable.a;
		return initialValue;
	} else {
		var updatedValue = resettable.b;
		return updatedValue;
	}
};
var elm$core$Basics$not = _Basics_not;
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Form$DatePicker$Internal$update = F2(
	function (msg, state) {
		switch (msg.$) {
			case 0:
				var minDate = msg.a;
				var maxDate = msg.b;
				var includeTime = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{Q: true, r: elm$core$Maybe$Nothing}),
					A4(
						author$project$Form$DatePicker$Internal$openCmd,
						author$project$Resettable$getValue(state.g),
						minDate,
						maxDate,
						includeTime));
			case 1:
				var _n1 = !_Utils_eq(state.W, elm$core$Maybe$Nothing);
				if (_n1) {
					return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{Q: false}),
						elm$core$Platform$Cmd$none);
				}
			case 2:
				var minDate = msg.a;
				var maxDate = msg.b;
				var date = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							r: A3(author$project$Form$DatePicker$Internal$initNavigationDate, minDate, maxDate, date)
						}),
					elm$core$Platform$Cmd$none);
			case 3:
				var minDate = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							r: A2(
								elm$core$Maybe$map,
								A2(
									elm$core$Basics$composeR,
									author$project$Form$DatePicker$Helpers$previousYear,
									A2(author$project$Form$DatePicker$Helpers$maybeClamp, minDate, state.r)),
								state.r)
						}),
					elm$core$Platform$Cmd$none);
			case 4:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							r: A2(elm$core$Maybe$map, author$project$Form$DatePicker$Helpers$previousMonth, state.r)
						}),
					elm$core$Platform$Cmd$none);
			case 5:
				var maxDate = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							r: A2(
								elm$core$Maybe$map,
								A2(
									elm$core$Basics$composeR,
									author$project$Form$DatePicker$Helpers$nextYear,
									A2(author$project$Form$DatePicker$Helpers$maybeClamp, state.r, maxDate)),
								state.r)
						}),
					elm$core$Platform$Cmd$none);
			case 6:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							r: A2(elm$core$Maybe$map, author$project$Form$DatePicker$Helpers$nextMonth, state.r)
						}),
					elm$core$Platform$Cmd$none);
			case 7:
				var date = msg.a;
				var includeTime = msg.b;
				if (!includeTime) {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{
								Q: false,
								g: A2(
									author$project$Resettable$update,
									elm$core$Maybe$Just(date),
									state.g)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{
								W: elm$core$Maybe$Just(date)
							}),
						elm$core$Platform$Cmd$none);
				}
			case 12:
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
			case 13:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							Q: false,
							g: A2(author$project$Resettable$update, elm$core$Maybe$Nothing, state.g)
						}),
					elm$core$Platform$Cmd$none);
			case 8:
				var select = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							q: elm$core$Maybe$Just(select)
						}),
					author$project$Form$DatePicker$Internal$openTimeSelect(select));
			case 9:
				var selectMsg = msg.a;
				var _n3 = A2(author$project$Form$Select$update, selectMsg, state.dL);
				var newSelect = _n3.a;
				var cmd = _n3.b;
				var focusedSelect = ((!author$project$Form$Select$getIsOpen(newSelect)) && _Utils_eq(
					state.q,
					elm$core$Maybe$Just(0))) ? elm$core$Maybe$Nothing : state.q;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{q: focusedSelect, dL: newSelect}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(elm$core$Platform$Cmd$map, author$project$Form$DatePicker$Internal$UpdateHours, cmd),
								(!_Utils_eq(focusedSelect, elm$core$Maybe$Nothing)) ? elm$core$Platform$Cmd$none : A2(
								elm$core$Task$attempt,
								author$project$Form$DatePicker$Internal$DomFocus,
								elm$browser$Browser$Dom$focus('FORM_DATEPICKER'))
							])));
			case 10:
				var selectMsg = msg.a;
				var _n4 = A2(author$project$Form$Select$update, selectMsg, state.dU);
				var newSelect = _n4.a;
				var cmd = _n4.b;
				var focusedSelect = ((!author$project$Form$Select$getIsOpen(newSelect)) && _Utils_eq(
					state.q,
					elm$core$Maybe$Just(1))) ? elm$core$Maybe$Nothing : state.q;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{q: focusedSelect, dU: newSelect}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(elm$core$Platform$Cmd$map, author$project$Form$DatePicker$Internal$UpdateMinutes, cmd),
								(!_Utils_eq(focusedSelect, elm$core$Maybe$Nothing)) ? elm$core$Platform$Cmd$none : A2(
								elm$core$Task$attempt,
								author$project$Form$DatePicker$Internal$DomFocus,
								elm$browser$Browser$Dom$focus('FORM_DATEPICKER'))
							])));
			case 11:
				var selectMsg = msg.a;
				var _n5 = A2(author$project$Form$Select$update, selectMsg, state.d5);
				var newSelect = _n5.a;
				var cmd = _n5.b;
				var focusedSelect = ((!author$project$Form$Select$getIsOpen(newSelect)) && _Utils_eq(
					state.q,
					elm$core$Maybe$Just(2))) ? elm$core$Maybe$Nothing : state.q;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{q: focusedSelect, d5: newSelect}),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(elm$core$Platform$Cmd$map, author$project$Form$DatePicker$Internal$UpdateSeconds, cmd),
								(!_Utils_eq(focusedSelect, elm$core$Maybe$Nothing)) ? elm$core$Platform$Cmd$none : A2(
								elm$core$Task$attempt,
								author$project$Form$DatePicker$Internal$DomFocus,
								elm$browser$Browser$Dom$focus('FORM_DATEPICKER'))
							])));
			default:
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Form$DatePicker$update = F2(
	function (msg, _n0) {
		var state = _n0;
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Basics$identity,
			A2(author$project$Form$DatePicker$Internal$update, msg, state));
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {dO: index, dS: match, dW: number, d7: submatches};
	});
var elm$regex$Regex$contains = _Regex_contains;
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{cj: false, cQ: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var author$project$Form$FloatInput$Internal$update = F2(
	function (_n0, state) {
		var string = _n0;
		var _n1 = A2(
			elm$regex$Regex$contains,
			A2(
				elm$core$Maybe$withDefault,
				elm$regex$Regex$never,
				elm$regex$Regex$fromString(
					'^[-]?[0-9]*([.][0-9]{0,' + (elm$core$String$fromInt(state.bl) + '})?$'))),
			string);
		if (_n1) {
			return _Utils_update(
				state,
				{
					s: A2(author$project$Resettable$update, string, state.s)
				});
		} else {
			return _Utils_update(
				state,
				{bi: state.bi + 1});
		}
	});
var author$project$Form$FloatInput$update = F2(
	function (msg, _n0) {
		var state = _n0;
		return A2(author$project$Form$FloatInput$Internal$update, msg, state);
	});
var author$project$Form$Input$Internal$update = F2(
	function (_n0, state) {
		var string = _n0;
		return _Utils_update(
			state,
			{
				s: A2(author$project$Resettable$update, string, state.s)
			});
	});
var author$project$Form$Input$update = F2(
	function (msg, _n0) {
		var state = _n0;
		return A2(author$project$Form$Input$Internal$update, msg, state);
	});
var author$project$Form$IntInput$Internal$update = F2(
	function (_n0, state) {
		var string = _n0;
		var _n1 = A2(
			elm$regex$Regex$contains,
			A2(
				elm$core$Maybe$withDefault,
				elm$regex$Regex$never,
				elm$regex$Regex$fromString('^[-]?[0-9]*$')),
			string);
		if (_n1) {
			return _Utils_update(
				state,
				{
					s: A2(author$project$Resettable$update, string, state.s)
				});
		} else {
			return _Utils_update(
				state,
				{bi: state.bi + 1});
		}
	});
var author$project$Form$IntInput$update = F2(
	function (msg, _n0) {
		var state = _n0;
		return A2(author$project$Form$IntInput$Internal$update, msg, state);
	});
var author$project$Form$MultiSelect$Internal$DomFocus = function (a) {
	return {$: 7, a: a};
};
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
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{Q: true}),
					elm$core$Platform$Cmd$none);
			case 1:
				var _n1 = state.A;
				if (_n1.$ === 1) {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{Q: false}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
				}
			case 6:
				var option = msg.a;
				var _n2 = _Utils_eq(
					elm$core$Maybe$Just(option),
					state.A);
				if (_n2) {
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: elm$core$Maybe$Nothing, Q: false}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
				}
			case 2:
				var option = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							h: A2(author$project$Form$MultiSelect$Internal$toggleOption, option, state.h)
						}),
					elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							h: A2(author$project$Resettable$update, _List_Nil, state.h)
						}),
					elm$core$Platform$Cmd$none);
			case 4:
				if (!msg.b) {
					var toLabel = msg.a;
					var _n3 = msg.b;
					var newFocusedOption = A2(
						author$project$Form$Helpers$getPreviousOption,
						mgold$elm_nonempty_list$List$Nonempty$toList(state.a2),
						state.A);
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: newFocusedOption}),
						A3(author$project$Form$Helpers$focusOption, toLabel, newFocusedOption, author$project$Form$MultiSelect$Internal$DomFocus));
				} else {
					var toLabel = msg.a;
					var _n4 = msg.b;
					var newFocusedOption = A2(
						author$project$Form$Helpers$getNextOption,
						mgold$elm_nonempty_list$List$Nonempty$toList(state.a2),
						state.A);
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: newFocusedOption}),
						A3(author$project$Form$Helpers$focusOption, toLabel, newFocusedOption, author$project$Form$MultiSelect$Internal$DomFocus));
				}
			case 5:
				var option = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							A: elm$core$Maybe$Just(option)
						}),
					elm$core$Platform$Cmd$none);
			default:
				var result = msg.a;
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Form$MultiSelect$update = F2(
	function (msg, _n0) {
		var state = _n0;
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Basics$identity,
			A2(author$project$Form$MultiSelect$Internal$update, msg, state));
	});
var author$project$Form$SearchSelect$Internal$DomFocus = function (a) {
	return {$: 9, a: a};
};
var author$project$Form$SearchSelect$Internal$Response = function (a) {
	return {$: 3, a: a};
};
var author$project$Form$SearchSelect$Internal$searchResponseDecoder = function (optionDecoder) {
	return elm$json$Json$Decode$list(optionDecoder);
};
var elm$http$Http$Internal$EmptyBody = {$: 0};
var elm$http$Http$emptyBody = elm$http$Http$Internal$EmptyBody;
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_n4.$ === -1) {
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
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_n7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
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
		return {$: 4, a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$NetworkError = {$: 2};
var elm$http$Http$Timeout = {$: 1};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 2, a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.dx);
			if (_n0.$ === 1) {
				var decodeError = _n0.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm$core$Result$Ok(value);
			}
		});
};
var elm$http$Http$Internal$Request = elm$core$Basics$identity;
var elm$http$Http$request = elm$core$Basics$identity;
var elm$http$Http$get = F2(
	function (url, decoder) {
		return elm$http$Http$request(
			{
				dx: elm$http$Http$emptyBody,
				bN: elm$http$Http$expectJson(decoder),
				bp: _List_Nil,
				bV: 'GET',
				b5: elm$core$Maybe$Nothing,
				aI: url,
				b7: false
			});
	});
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0;
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
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{Q: true}),
					elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{A: elm$core$Maybe$Nothing, Z: '', Q: false}),
					elm$core$Platform$Cmd$none);
			case 2:
				var inputMinimum = msg.a;
				var value = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							Z: value,
							av: A2(author$project$Form$SearchSelect$Internal$shouldSearch, inputMinimum, value)
						}),
					A2(author$project$Form$SearchSelect$Internal$shouldSearch, inputMinimum, value) ? A3(author$project$Form$SearchSelect$Internal$searchRequest, state.b0, value, state.bY) : elm$core$Platform$Cmd$none);
			case 3:
				var result = msg.a;
				if (result.$ === 1) {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{av: false}),
						elm$core$Platform$Cmd$none);
				} else {
					var options = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: elm$core$Maybe$Nothing, av: false, a2: options}),
						elm$core$Platform$Cmd$none);
				}
			case 5:
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							k: A2(author$project$Resettable$update, elm$core$Maybe$Nothing, state.k)
						}),
					elm$core$Platform$Cmd$none);
			case 4:
				var selectedOption = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							Z: '',
							k: A2(
								author$project$Resettable$update,
								elm$core$Maybe$Just(selectedOption),
								state.k)
						}),
					elm$core$Platform$Cmd$none);
			case 6:
				if (!msg.b) {
					var toLabel = msg.a;
					var _n2 = msg.b;
					var newFocusedOption = A2(author$project$Form$Helpers$getPreviousOption, state.a2, state.A);
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: newFocusedOption}),
						A3(author$project$Form$Helpers$focusOption, toLabel, newFocusedOption, author$project$Form$SearchSelect$Internal$DomFocus));
				} else {
					var toLabel = msg.a;
					var _n3 = msg.b;
					var newFocusedOption = A2(author$project$Form$Helpers$getNextOption, state.a2, state.A);
					return _Utils_Tuple2(
						_Utils_update(
							state,
							{A: newFocusedOption}),
						A3(author$project$Form$Helpers$focusOption, toLabel, newFocusedOption, author$project$Form$SearchSelect$Internal$DomFocus));
				}
			case 7:
				var option = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							A: elm$core$Maybe$Just(option)
						}),
					elm$core$Platform$Cmd$none);
			case 8:
				var option = msg.a;
				return _Utils_eq(
					elm$core$Maybe$Just(option),
					state.A) ? _Utils_Tuple2(
					_Utils_update(
						state,
						{A: elm$core$Maybe$Nothing, Q: false}),
					elm$core$Platform$Cmd$none) : _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(state, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Form$SearchSelect$update = F2(
	function (msg, _n0) {
		var state = _n0;
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Basics$identity,
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
		if (!msg.$) {
			var string = msg.a;
			return _Utils_update(
				state,
				{
					s: A2(
						author$project$Resettable$update,
						A3(elm$core$List$foldl, author$project$Form$TextArea$Internal$replace, string, state.bB),
						state.s)
				});
		} else {
			var string = msg.a;
			return _Utils_update(
				state,
				{
					s: A2(author$project$Resettable$update, string, state.s)
				});
		}
	});
var author$project$Form$TextArea$update = F2(
	function (msg, _n0) {
		var state = _n0;
		return A2(author$project$Form$TextArea$Internal$update, msg, state);
	});
var author$project$Msg$DatePicker2Msg = function (a) {
	return {$: 10, a: a};
};
var author$project$Msg$DatePicker3Msg = function (a) {
	return {$: 11, a: a};
};
var author$project$Msg$DatePickerMsg = function (a) {
	return {$: 9, a: a};
};
var author$project$Msg$MultiSelectMsg = function (a) {
	return {$: 7, a: a};
};
var author$project$Msg$SearchSelectMsg = function (a) {
	return {$: 8, a: a};
};
var author$project$Msg$SelectMsg = function (a) {
	return {$: 6, a: a};
};
var author$project$Msg$UpdateCountryOfBirth = function (a) {
	return {$: 17, a: a};
};
var author$project$Msg$UpdateStartDate = function (a) {
	return {$: 14, a: a};
};
var author$project$Toasters$Color$Green = 0;
var author$project$Toasters$Internal$initialToaster = F2(
	function (color, message) {
		return {am: color, bT: message, ag: 0};
	});
var author$project$Toasters$Internal$add = F3(
	function (color, message, toasters) {
		return A2(
			elm$core$List$cons,
			A2(author$project$Toasters$Internal$initialToaster, color, message),
			toasters);
	});
var author$project$Toasters$addGreen = F2(
	function (message, _n0) {
		var toasters = _n0;
		return A3(author$project$Toasters$Internal$add, 0, message, toasters);
	});
var author$project$Toasters$Color$Red = 1;
var author$project$Toasters$addRed = F2(
	function (message, _n0) {
		var toasters = _n0;
		return A3(author$project$Toasters$Internal$add, 1, message, toasters);
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var author$project$Toasters$Internal$tick = F2(
	function (toaster, toasters) {
		var _n0 = toaster.ag > 100;
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
						{ag: toaster.ag + 1})
					]));
		}
	});
var author$project$Toasters$Internal$update = F2(
	function (toasterMsg, toasters) {
		if (toasterMsg.$ === 1) {
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
	function (toasterMsg, _n0) {
		var toasters = _n0;
		return A2(author$project$Toasters$Internal$update, toasterMsg, toasters);
	});
var author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var toasterMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							dh: A2(author$project$Toasters$update, toasterMsg, model.dh)
						}),
					elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							dh: A2(author$project$Toasters$addGreen, 'Green Toasters are great.', model.dh)
						}),
					elm$core$Platform$Cmd$none);
			case 2:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							dh: A2(author$project$Toasters$addRed, 'Red Toasters are even better!', model.dh)
						}),
					elm$core$Platform$Cmd$none);
			case 3:
				var inputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							Z: A2(author$project$Form$Input$update, inputMsg, model.Z)
						}),
					elm$core$Platform$Cmd$none);
			case 4:
				var intInputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cH: A2(author$project$Form$IntInput$update, intInputMsg, model.cH)
						}),
					elm$core$Platform$Cmd$none);
			case 5:
				var floatInputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cz: A2(author$project$Form$FloatInput$update, floatInputMsg, model.cz)
						}),
					elm$core$Platform$Cmd$none);
			case 6:
				var selectMsg = msg.a;
				var _n1 = A2(author$project$Form$Select$update, selectMsg, model.c7);
				var newSelect = _n1.a;
				var cmd = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{c7: newSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$SelectMsg, cmd));
			case 7:
				var multiSelectMsg = msg.a;
				var _n2 = A2(author$project$Form$MultiSelect$update, multiSelectMsg, model.cP);
				var newMultiSelect = _n2.a;
				var cmd = _n2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cP: newMultiSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$MultiSelectMsg, cmd));
			case 8:
				var searchSelectMsg = msg.a;
				var _n3 = A2(author$project$Form$SearchSelect$update, searchSelectMsg, model.c6);
				var newSearchSelect = _n3.a;
				var cmd = _n3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{c6: newSearchSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$SearchSelectMsg, cmd));
			case 9:
				var datePickerMsg = msg.a;
				var _n4 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.co);
				var newDatePicker = _n4.a;
				var cmd = _n4.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{co: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$DatePickerMsg, cmd));
			case 10:
				var datePickerMsg = msg.a;
				var _n5 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.cp);
				var newDatePicker = _n5.a;
				var cmd = _n5.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cp: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$DatePicker2Msg, cmd));
			case 11:
				var datePickerMsg = msg.a;
				var _n6 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.cq);
				var newDatePicker = _n6.a;
				var cmd = _n6.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cq: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$DatePicker3Msg, cmd));
			case 12:
				var textAreaMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							df: A2(author$project$Form$TextArea$update, textAreaMsg, model.df)
						}),
					elm$core$Platform$Cmd$none);
			case 18:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{di: !model.di}),
					elm$core$Platform$Cmd$none);
			case 19:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dj: !model.dj}),
					elm$core$Platform$Cmd$none);
			case 20:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dk: !model.dk}),
					elm$core$Platform$Cmd$none);
			case 13:
				var inputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							dV: A2(author$project$Form$Input$update, inputMsg, model.dV)
						}),
					elm$core$Platform$Cmd$none);
			case 14:
				var datePickerMsg = msg.a;
				var _n7 = A2(author$project$Form$DatePicker$update, datePickerMsg, model.dc);
				var newDatePicker = _n7.a;
				var cmd = _n7.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dc: newDatePicker}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$UpdateStartDate, cmd));
			case 15:
				var inputMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ct: A2(author$project$Form$Input$update, inputMsg, model.ct)
						}),
					elm$core$Platform$Cmd$none);
			case 16:
				var selectMsg = msg.a;
				var _n8 = A2(author$project$Form$Select$update, selectMsg, model.cW);
				var newSelect = _n8.a;
				var cmd = _n8.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cW: newSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$SelectMsg, cmd));
			case 17:
				var searchSelectMsg = msg.a;
				var _n9 = A2(author$project$Form$SearchSelect$update, searchSelectMsg, model.cn);
				var newSearchSelect = _n9.a;
				var cmd = _n9.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cn: newSearchSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$UpdateCountryOfBirth, cmd));
			case 21:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cN: true}),
					elm$core$Platform$Cmd$none);
			case 22:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cN: false}),
					elm$core$Platform$Cmd$none);
			case 23:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cM: true}),
					elm$core$Platform$Cmd$none);
			case 24:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cM: false}),
					elm$core$Platform$Cmd$none);
			default:
				var selectMsg = msg.a;
				var _n10 = A2(author$project$Form$Select$update, selectMsg, model.cL);
				var newSelect = _n10.a;
				var cmd = _n10.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cL: newSelect}),
					A2(elm$core$Platform$Cmd$map, author$project$Msg$SelectMsg, cmd));
		}
	});
var 1602$elm_feather$FeatherIcons$Icon = elm$core$Basics$identity;
var 1602$elm_feather$FeatherIcons$defaultAttributes = function (name) {
	return {
		bj: elm$core$Maybe$Just('feather feather-' + name),
		a5: 24,
		a6: '',
		bF: 2,
		bI: '0 0 24 24'
	};
};
var 1602$elm_feather$FeatherIcons$makeBuilder = F2(
	function (name, src) {
		return {
			t: 1602$elm_feather$FeatherIcons$defaultAttributes(name),
			w: src
		};
	});
var elm$json$Json$Encode$string = _Json_wrap;
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var 1602$elm_feather$FeatherIcons$xmlns = function (s) {
	return A2(
		elm$virtual_dom$VirtualDom$property,
		'xmlns',
		elm$json$Json$Encode$string(s));
};
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$line = elm$svg$Svg$trustedNode('line');
var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var 1602$elm_feather$FeatherIcons$calendar = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'calendar',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$polygon = elm$svg$Svg$trustedNode('polygon');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var 1602$elm_feather$FeatherIcons$edit = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'edit',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var author$project$Button$Button = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2(elm$core$String$join, ', ', args) + ')'));
	});
var rtfeldman$elm_css$Css$Structure$Compatible = 0;
var rtfeldman$elm_css$Css$rgb = F3(
	function (r, g, b) {
		return {
			aM: 1,
			dw: b,
			am: 0,
			dJ: g,
			d0: r,
			s: A2(
				rtfeldman$elm_css$Css$cssFunction,
				'rgb',
				A2(
					elm$core$List$map,
					elm$core$String$fromInt,
					_List_fromArray(
						[r, g, b])))
		};
	});
var author$project$Button$green = function (_n0) {
	var config = _n0;
	return _Utils_update(
		config,
		{
			am: A3(rtfeldman$elm_css$Css$rgb, 81, 163, 81)
		});
};
var author$project$Button$href = F2(
	function (url, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{aI: url});
	});
var author$project$Button$Content$Icon = function (a) {
	return {$: 0, a: a};
};
var author$project$Button$icon = F2(
	function (icon_, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{
				ao: author$project$Button$Content$Icon(icon_)
			});
	});
var author$project$Button$isDisabled = F2(
	function (isDisabled_, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{aW: isDisabled_});
	});
var author$project$Button$isLoading = F2(
	function (isLoading_, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{aZ: isLoading_});
	});
var author$project$Button$onClick = F2(
	function (msg, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{
				bx: elm$core$Maybe$Just(msg)
			});
	});
var author$project$Button$red = function (_n0) {
	var config = _n0;
	return _Utils_update(
		config,
		{
			am: A3(rtfeldman$elm_css$Css$rgb, 189, 54, 47)
		});
};
var 1602$elm_feather$FeatherIcons$loader = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'loader',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width('24'),
					elm$svg$Svg$Attributes$height('24'),
					elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('currentColor'),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$strokeLinejoin('round'),
					elm$svg$Svg$Attributes$class('feather feather-loader')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('12'),
							elm$svg$Svg$Attributes$y1('2'),
							elm$svg$Svg$Attributes$x2('12'),
							elm$svg$Svg$Attributes$y2('6')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('12'),
							elm$svg$Svg$Attributes$y1('18'),
							elm$svg$Svg$Attributes$x2('12'),
							elm$svg$Svg$Attributes$y2('22')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('4.93'),
							elm$svg$Svg$Attributes$y1('4.93'),
							elm$svg$Svg$Attributes$x2('7.76'),
							elm$svg$Svg$Attributes$y2('7.76')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('16.24'),
							elm$svg$Svg$Attributes$y1('16.24'),
							elm$svg$Svg$Attributes$x2('19.07'),
							elm$svg$Svg$Attributes$y2('19.07')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('2'),
							elm$svg$Svg$Attributes$y1('12'),
							elm$svg$Svg$Attributes$x2('6'),
							elm$svg$Svg$Attributes$y2('12')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('18'),
							elm$svg$Svg$Attributes$y1('12'),
							elm$svg$Svg$Attributes$x2('22'),
							elm$svg$Svg$Attributes$y2('12')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('4.93'),
							elm$svg$Svg$Attributes$y1('19.07'),
							elm$svg$Svg$Attributes$x2('7.76'),
							elm$svg$Svg$Attributes$y2('16.24')
						]),
					_List_Nil),
					A2(
					elm$svg$Svg$line,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x1('16.24'),
							elm$svg$Svg$Attributes$y1('7.76'),
							elm$svg$Svg$Attributes$x2('19.07'),
							elm$svg$Svg$Attributes$y2('4.93')
						]),
					_List_Nil)
				]))
		]));
var elm$core$String$fromFloat = _String_fromNumber;
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$svg$Svg$map = elm$virtual_dom$VirtualDom$map;
var 1602$elm_feather$FeatherIcons$toHtml = F2(
	function (attributes, _n0) {
		var src = _n0.w;
		var attrs = _n0.t;
		var strSize = elm$core$String$fromFloat(attrs.a5);
		var baseAttributes = _List_fromArray(
			[
				elm$svg$Svg$Attributes$fill('none'),
				elm$svg$Svg$Attributes$height(
				_Utils_ap(strSize, attrs.a6)),
				elm$svg$Svg$Attributes$width(
				_Utils_ap(strSize, attrs.a6)),
				elm$svg$Svg$Attributes$stroke('currentColor'),
				elm$svg$Svg$Attributes$strokeLinecap('round'),
				elm$svg$Svg$Attributes$strokeLinejoin('round'),
				elm$svg$Svg$Attributes$strokeWidth(
				elm$core$String$fromFloat(attrs.bF)),
				elm$svg$Svg$Attributes$viewBox(attrs.bI)
			]);
		var combinedAttributes = _Utils_ap(
			function () {
				var _n1 = attrs.bj;
				if (!_n1.$) {
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
var rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var Skinney$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {al: charsProcessed, at: hash, ad: seed, aC: shift};
	});
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
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
	var acc = data.at ? A2(Skinney$murmur3$Murmur3$mix, data.ad, data.at) : data.ad;
	var h1 = acc ^ data.al;
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
		var res = data.at | (c << data.aC);
		var _n0 = data.aC;
		if (_n0 === 24) {
			var newHash = Skinney$murmur3$Murmur3$step(
				A2(Skinney$murmur3$Murmur3$mix, data.ad, res));
			return {al: data.al + 1, at: 0, ad: newHash, aC: 0};
		} else {
			return {al: data.al + 1, at: res, ad: data.ad, aC: data.aC + 8};
		}
	});
var Skinney$murmur3$UTF8$accumulate = F3(
	function (add, _char, _n0) {
		var acc = _n0.a;
		var combine = _n0.b;
		if (combine.$ === 1) {
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
	return {cl: elm$core$Maybe$Nothing, cD: _List_Nil, cR: _List_Nil, da: snippets};
};
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_n0) {
	var declarations = _n0;
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
			if (!declarations.a.$) {
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
			if (maybe.$ === 1) {
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
	return {$: 9, a: a};
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
		return {$: 3, a: a, b: b, c: c, d: d, e: e};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (!declaration.$) {
			var structureStyleBlock = declaration.a;
			return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 0:
				var structureStyleBlock = declaration.a;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 1:
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 2:
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 3:
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 4:
				return declaration;
			case 5:
				return declaration;
			case 6:
				return declaration;
			case 7:
				return declaration;
			case 8:
				return declaration;
			default:
				return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 8, a: a};
};
var rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 5, a: a};
};
var rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 6, a: a};
};
var rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 7, a: a};
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
					case 0:
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2(rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 1:
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
		return {$: 2, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 1, a: a};
};
var rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 0:
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 1:
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
						case 0:
							var styleBlock = declarations.a.a;
							return A2(
								elm$core$List$map,
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 1:
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
									if ((_n5.b && (_n5.a.$ === 1)) && (!_n5.b.b)) {
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
						case 2:
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
						case 3:
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
						case 4:
							var _n9 = declarations.a;
							return declarations;
						case 5:
							return declarations;
						case 6:
							return declarations;
						case 7:
							return declarations;
						case 8:
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
		if (!declaration.$) {
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
				return '0';
			case 1:
				return '1';
			case 2:
				return '2';
			case 3:
				return '3';
			case 4:
				return '4';
			case 5:
				return '5';
			case 6:
				return '6';
			case 7:
				return '7';
			case 8:
				return '8';
			case 9:
				return '9';
			case 10:
				return 'a';
			case 11:
				return 'b';
			case 12:
				return 'c';
			case 13:
				return 'd';
			case 14:
				return 'e';
			case 15:
				return 'f';
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
			'-',
			A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		elm$core$String$cons,
		'_',
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
			if ((!_n14.a.$) && (!_n14.b.$)) {
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
				case 0:
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 1:
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
				case 2:
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
							case 0:
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
							case 1:
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 2:
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 3:
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									elm$core$List$map,
									A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 4:
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 5:
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 6:
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 7:
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
				case 3:
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
				case 5:
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
								{dE: str, dV: name})
							]));
				case 4:
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
		case 0:
			var styleBlock = snippetDeclaration.a;
			return rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 1:
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 2:
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 3:
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				elm$core$List$map,
				A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 4:
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 5:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 6:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 7:
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
	var charset = _n0.cl;
	var imports = _n0.cD;
	var namespaces = _n0.cR;
	var snippets = _n0.da;
	var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {cl: charset, dF: declarations, cD: imports, cR: namespaces};
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
			case 0:
				var _n2 = declaration.a;
				var properties = _n2.c;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 1:
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
			case 2:
				var otherDeclarations = declaration.b;
				return elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 3:
				return _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 4:
				var properties = declaration.b;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 5:
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 6:
				var record = declaration.a;
				return elm$core$String$isEmpty(record.dE) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3(elm$core$Dict$insert, record.dV, record.dE, keyframesByName),
					declarations);
			case 7:
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 8:
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
						{dE: decl, dV: name});
				},
				elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_n0) {
	var charset = _n0.cl;
	var imports = _n0.cD;
	var namespaces = _n0.cR;
	var declarations = _n0.dF;
	var _n1 = A3(
		elm$core$List$foldr,
		rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2(elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _n1.a;
	var compactedDeclarations = _n1.b;
	var finalDeclarations = A2(rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {cl: charset, dF: finalDeclarations, cD: imports, cR: namespaces};
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
	return '(' + (expression.cx + (A2(
		elm$core$Maybe$withDefault,
		'',
		A2(
			elm$core$Maybe$map,
			elm$core$Basics$append(': '),
			expression.s)) + ')'));
};
var rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType) {
		case 0:
			return 'print';
		case 1:
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
		case 0:
			var expressions = mediaQuery.a;
			return A2(
				elm$core$String$join,
				' and ',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 1:
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 2:
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
	var str = _n0;
	return '::' + str;
};
var rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator) {
		case 0:
			return '+';
		case 1:
			return '~';
		case 2:
			return '>';
		default:
			return '';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 0:
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 1:
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 2:
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 0:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$cons,
					str,
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 1:
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
		case 0:
			var styleBlock = decl.a;
			return A2(rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 1:
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
		case 2:
			return 'TODO';
		case 3:
			return 'TODO';
		case 4:
			return 'TODO';
		case 5:
			return 'TODO';
		case 6:
			var name = decl.a.dV;
			var declaration = decl.a.dE;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 7:
			return 'TODO';
		case 8:
			return 'TODO';
		default:
			return 'TODO';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_n0) {
	var charset = _n0.cl;
	var imports = _n0.cD;
	var namespaces = _n0.cR;
	var declarations = _n0.dF;
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
var rtfeldman$elm_css$Css$Preprocess$Snippet = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3(rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, elm$core$Maybe$Nothing);
		return _List_fromArray(
			[
				rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
				A3(rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
			]);
	});
var rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		elm$core$String$cons,
		'_',
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
var author$project$Button$Css$loading = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A2(rtfeldman$elm_css$Css$property, 'animation', 'spin 1.5s linear infinite')
		]));
var rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2(rtfeldman$elm_css$Css$property, key, arg.s);
	});
var rtfeldman$elm_css$Css$marginLeft = rtfeldman$elm_css$Css$prop1('margin-left');
var rtfeldman$elm_css$Css$RemUnits = 0;
var rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			b8: 0,
			ci: 0,
			aq: 0,
			u: 0,
			a$: 0,
			aw: 0,
			R: 0,
			ax: 0,
			ay: 0,
			_: 0,
			aa: 0,
			G: 0,
			T: numericValue,
			aF: 0,
			aH: unitLabel,
			be: units,
			s: _Utils_ap(
				elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var rtfeldman$elm_css$Css$rem = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'rem');
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
	return {$: 6, a: a};
};
var rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 0:
					var str = style.a;
					var key = A2(
						elm$core$Maybe$withDefault,
						'',
						elm$core$List$head(
							A2(elm$core$String$split, ':', str)));
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 1:
					var selector = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 2:
					var combinator = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 3:
					var pseudoElement = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 4:
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 5:
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
var rtfeldman$elm_css$Css$Internal$IncompatibleUnits = 0;
var rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '', 0);
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
var rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$Node;
var rtfeldman$elm_css$Html$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$node;
var rtfeldman$elm_css$Html$Styled$div = rtfeldman$elm_css$Html$Styled$node('div');
var rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 4, a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var rtfeldman$elm_css$Html$Styled$fromUnstyled = rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		elm$virtual_dom$VirtualDom$text(str));
};
var rtfeldman$elm_css$Html$Styled$text = rtfeldman$elm_css$VirtualDom$Styled$text;
var author$project$Button$content = F4(
	function (content_, size, color, isLoading_) {
		var _n0 = _Utils_Tuple2(content_, isLoading_);
		if (_n0.a.$ === 1) {
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
								[author$project$Button$Css$loading]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$loader))
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
					A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, icon_));
			} else {
				return A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[author$project$Button$Css$loading]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$loader))
						]));
			}
		}
	});
var author$project$Button$Css$buttonHeight = function (size) {
	if (!size) {
		return rtfeldman$elm_css$Css$rem(1.4);
	} else {
		return rtfeldman$elm_css$Css$rem(1.8);
	}
};
var author$project$Button$Css$buttonPadding = F2(
	function (content, size) {
		var _n0 = _Utils_Tuple2(content, size);
		if (_n0.a.$ === 1) {
			if (!_n0.b) {
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
var rtfeldman$elm_css$Css$auto = {ds: 0, b: 0, aq: 0, br: 0, dR: 0, aw: 0, R: 0, G: 0, az: 0, E: 0, bG: 0, aG: 0, z: 0, s: 'auto'};
var rtfeldman$elm_css$Css$width = rtfeldman$elm_css$Css$prop1('width');
var author$project$Button$Css$buttonWidth = F2(
	function (content, size) {
		var _n0 = _Utils_Tuple2(content, size);
		if (!_n0.a.$) {
			if (!_n0.b) {
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
	return color;
};
var rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'background-color', c.s);
};
var rtfeldman$elm_css$Css$bold = {M: 0, s: 'bold'};
var rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.s, argB.s, argC.s])));
	});
var rtfeldman$elm_css$Css$border3 = rtfeldman$elm_css$Css$prop3('border');
var rtfeldman$elm_css$Css$borderBox = {bL: 0, bh: 0, s: 'border-box'};
var rtfeldman$elm_css$Css$borderRadius = rtfeldman$elm_css$Css$prop1('border-radius');
var rtfeldman$elm_css$Css$boxSizing = rtfeldman$elm_css$Css$prop1('box-sizing');
var rtfeldman$elm_css$Css$color = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'color', c.s);
};
var rtfeldman$elm_css$Css$cursor = rtfeldman$elm_css$Css$prop1('cursor');
var rtfeldman$elm_css$Css$display = rtfeldman$elm_css$Css$prop1('display');
var rtfeldman$elm_css$Css$fontSize = rtfeldman$elm_css$Css$prop1('font-size');
var rtfeldman$elm_css$Css$fontWeight = function (_n0) {
	var value = _n0.s;
	return A2(rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var rtfeldman$elm_css$Css$height = rtfeldman$elm_css$Css$prop1('height');
var rtfeldman$elm_css$Css$hidden = {x: 0, az: 0, s: 'hidden', bf: 0};
var rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 2, a: a};
};
var rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var rtfeldman$elm_css$Css$hover = rtfeldman$elm_css$Css$pseudoClass('hover');
var rtfeldman$elm_css$Css$inlineFlex = {l: 0, s: 'inline-flex'};
var rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.s, argB.s])));
	});
var rtfeldman$elm_css$Css$margin2 = rtfeldman$elm_css$Css$prop2('margin');
var rtfeldman$elm_css$Css$middle = rtfeldman$elm_css$Css$prop1('middle');
var rtfeldman$elm_css$Css$noWrap = {aR: 0, bo: 0, s: 'nowrap', V: 0};
var rtfeldman$elm_css$Css$none = {aj: 0, cg: 0, x: 0, b: 0, l: 0, dM: 0, cE: 0, bS: 0, ay: 0, _: 0, G: 0, d: 0, c: 0, bW: 0, bz: 0, d_: 0, E: 0, bC: 0, d3: 0, aE: 0, af: 0, z: 0, j: 0, eb: 0, s: 'none'};
var rtfeldman$elm_css$Css$notAllowed = {b: 0, s: 'not-allowed'};
var rtfeldman$elm_css$Css$UnitlessFloat = 0;
var rtfeldman$elm_css$Css$num = function (val) {
	return {
		aa: 0,
		G: 0,
		dW: 0,
		T: val,
		aH: '',
		be: 0,
		s: elm$core$String$fromFloat(val)
	};
};
var rtfeldman$elm_css$Css$opacity = rtfeldman$elm_css$Css$prop1('opacity');
var rtfeldman$elm_css$Css$outlineWidth = rtfeldman$elm_css$Css$prop1('outline-width');
var rtfeldman$elm_css$Css$overflow = rtfeldman$elm_css$Css$prop1('overflow');
var rtfeldman$elm_css$Css$padding2 = rtfeldman$elm_css$Css$prop2('padding');
var rtfeldman$elm_css$Css$pointer = {b: 0, s: 'pointer'};
var rtfeldman$elm_css$Css$PxUnits = 0;
var rtfeldman$elm_css$Css$px = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'px');
var rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			aM: alpha,
			dw: b,
			am: 0,
			dJ: g,
			d0: r,
			s: A2(
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
var rtfeldman$elm_css$Css$solid = {x: 0, ae: 0, s: 'solid'};
var rtfeldman$elm_css$Css$textDecoration = rtfeldman$elm_css$Css$prop1('text-decoration');
var rtfeldman$elm_css$Css$transparent = {am: 0, s: 'transparent'};
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
					A4(rtfeldman$elm_css$Css$rgba, color.d0, color.dJ, color.dw, 0.2)),
					rtfeldman$elm_css$Css$borderRadius(
					rtfeldman$elm_css$Css$px(2)),
					rtfeldman$elm_css$Css$backgroundColor(rtfeldman$elm_css$Css$transparent),
					rtfeldman$elm_css$Css$fontWeight(rtfeldman$elm_css$Css$bold),
					rtfeldman$elm_css$Css$color(color),
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
					rtfeldman$elm_css$Css$textDecoration(rtfeldman$elm_css$Css$none),
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
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
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
var rtfeldman$elm_css$Html$Styled$Attributes$class = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('className');
var author$project$Html$Styled$Bdt$attributeIf = F2(
	function (bool, attribute) {
		return bool ? attribute : rtfeldman$elm_css$Html$Styled$Attributes$class('');
	});
var author$project$Html$Styled$Bdt$maybeAttribute = F2(
	function (f, maybe) {
		if (maybe.$ === 1) {
			return rtfeldman$elm_css$Html$Styled$Attributes$class('');
		} else {
			var a = maybe.a;
			return f(a);
		}
	});
var rtfeldman$elm_css$Html$Styled$a = rtfeldman$elm_css$Html$Styled$node('a');
var rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2(rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var rtfeldman$elm_css$Html$Styled$Attributes$target = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('target');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
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
var author$project$Button$render = function (_n0) {
	var config = _n0;
	return A2(
		rtfeldman$elm_css$Html$Styled$a,
		_List_fromArray(
			[
				A5(author$project$Button$Css$button, config.a5, config.ao, config.am, config.aW, config.aZ),
				A2(
				author$project$Html$Styled$Bdt$attributeIf,
				!config.aW,
				A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Events$onClick, config.bx)),
				A2(
				author$project$Html$Styled$Bdt$attributeIf,
				!elm$core$String$isEmpty(config.aI),
				rtfeldman$elm_css$Html$Styled$Attributes$href(config.aI)),
				A2(
				author$project$Html$Styled$Bdt$attributeIf,
				!elm$core$String$isEmpty(config.aI),
				rtfeldman$elm_css$Html$Styled$Attributes$target('_blank'))
			]),
		_List_fromArray(
			[
				author$project$Button$Css$spinKeyFrames,
				A4(author$project$Button$content, config.ao, config.a5, config.am, config.aZ)
			]));
};
var author$project$Button$Size$Small = 0;
var author$project$Button$small = function (_n0) {
	var config = _n0;
	return _Utils_update(
		config,
		{a5: 0});
};
var author$project$Button$Content$Text = function (a) {
	return {$: 1, a: a};
};
var author$project$Button$text = F2(
	function (text_, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{
				ao: author$project$Button$Content$Text(text_)
			});
	});
var author$project$Button$Size$Normal = 1;
var author$project$Button$initialConfig = {
	am: A3(rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	ao: author$project$Button$Content$Text(''),
	aW: false,
	aZ: false,
	bQ: true,
	bx: elm$core$Maybe$Nothing,
	a5: 1,
	aI: ''
};
var author$project$Button$view = author$project$Button$initialConfig;
var author$project$Card$CardBlock = elm$core$Basics$identity;
var author$project$Card$CardBlockConfig = F3(
	function (defaultCols, sizes, children) {
		return {bM: children, cs: defaultCols, c9: sizes};
	});
var author$project$Card$block = F2(
	function (cols, children) {
		return A3(author$project$Card$CardBlockConfig, cols, _List_Nil, children);
	});
var author$project$Card$Config = elm$core$Basics$identity;
var author$project$Card$body = F2(
	function (cardBlocks, _n0) {
		var viewConfig = _n0;
		return _Utils_update(
			viewConfig,
			{aO: cardBlocks});
	});
var author$project$Card$footer = F2(
	function (buttons, _n0) {
		var viewConfig = _n0;
		return _Utils_update(
			viewConfig,
			{aS: buttons});
	});
var author$project$Card$header = F3(
	function (title, buttons, _n0) {
		var viewConfig = _n0;
		return _Utils_update(
			viewConfig,
			{aT: buttons, aU: title});
	});
var author$project$Card$maybeBlock = F3(
	function (cols, maybe, children) {
		if (maybe.$ === 1) {
			return A3(author$project$Card$CardBlockConfig, cols, _List_Nil, _List_Nil);
		} else {
			var a = maybe.a;
			return A3(
				author$project$Card$CardBlockConfig,
				cols,
				_List_Nil,
				children(a));
		}
	});
var author$project$Grid$SizeHelpers$breakpointPxWidth = function (size) {
	switch (size) {
		case 0:
			return 576;
		case 1:
			return 768;
		case 2:
			return 992;
		case 3:
			return 1200;
		default:
			return 1600;
	}
};
var author$project$Grid$SizeHelpers$colsToFloat = function (cols) {
	switch (cols) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var rtfeldman$elm_css$Css$flexBasis = rtfeldman$elm_css$Css$prop1('flex-basis');
var rtfeldman$elm_css$Css$maxWidth = rtfeldman$elm_css$Css$prop1('max-width');
var rtfeldman$elm_css$Css$PercentageUnits = 0;
var rtfeldman$elm_css$Css$pct = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '%');
var rtfeldman$elm_css$Css$Structure$AllQuery = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$Css$Media$all = rtfeldman$elm_css$Css$Structure$AllQuery;
var rtfeldman$elm_css$Css$Media$feature = F2(
	function (key, _n0) {
		var value = _n0.s;
		return {
			cx: key,
			s: elm$core$Maybe$Just(value)
		};
	});
var rtfeldman$elm_css$Css$Media$minWidth = function (value) {
	return A2(rtfeldman$elm_css$Css$Media$feature, 'min-width', value);
};
var rtfeldman$elm_css$Css$Preprocess$WithMedia = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
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
	switch (size) {
		case 0:
			return 540;
		case 1:
			return 720;
		case 2:
			return 960;
		case 3:
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
	var cardBlockConfig = _n0;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		!elm$core$List$isEmpty(cardBlockConfig.bM),
		_List_fromArray(
			[
				A2(author$project$Card$Css$block, cardBlockConfig.cs, cardBlockConfig.c9)
			]),
		cardBlockConfig.bM);
};
var rtfeldman$elm_css$Css$flexWrap = rtfeldman$elm_css$Css$prop1('flex-wrap');
var rtfeldman$elm_css$Css$wrap = {aR: 0, bo: 0, s: 'wrap'};
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
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2(elm$core$String$startsWith, '#', str) ? str : A2(elm$core$String$cons, '#', str);
};
var rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		aM: 1,
		dw: 0,
		am: 0,
		dJ: 0,
		d0: 0,
		s: rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var elm$core$String$toLower = _String_toLower;
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
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
				switch (_char) {
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
		if ((((!results.a.a.$) && (!results.a.b.$)) && (!results.b.a.$)) && (!results.b.b.$)) {
			var _n5 = results.a;
			var red = _n5.a.a;
			var green = _n5.b.a;
			var _n6 = results.b;
			var blue = _n6.a.a;
			var alpha = _n6.b.a;
			return {
				aM: alpha / 255,
				dw: blue,
				am: 0,
				dJ: green,
				d0: red,
				s: rtfeldman$elm_css$Css$withPrecedingHash(str)
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
					_Utils_Tuple2('f', 'f'));
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
								_Utils_Tuple2('f', 'f'));
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
var rtfeldman$elm_css$Css$marginBottom = rtfeldman$elm_css$Css$prop1('margin-bottom');
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
var rtfeldman$elm_css$Css$stringsToValue = function (list) {
	return elm$core$List$isEmpty(list) ? {s: 'none'} : {
		s: A2(
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
var rtfeldman$elm_css$Css$UnitlessInteger = 0;
var rtfeldman$elm_css$Css$int = function (val) {
	return {
		M: 0,
		br: 0,
		aa: 0,
		G: 0,
		dW: 0,
		T: val,
		aH: '',
		be: 0,
		s: elm$core$String$fromInt(val)
	};
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
	var viewConfig = _n0;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		viewConfig.bQ,
		_List_fromArray(
			[author$project$Card$Css$card]),
		_List_fromArray(
			[
				A3(
				author$project$Html$Styled$Bdt$divIf,
				(viewConfig.aU !== '') || (!elm$core$List$isEmpty(viewConfig.aT)),
				_List_fromArray(
					[author$project$Card$Css$header]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$span,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text(viewConfig.aU)
							])),
						A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						A2(elm$core$List$map, author$project$Button$render, viewConfig.aT))
					])),
				A3(
				author$project$Html$Styled$Bdt$divIf,
				!elm$core$List$isEmpty(viewConfig.aO),
				_List_fromArray(
					[author$project$Card$Css$body]),
				A2(elm$core$List$map, author$project$Card$renderCardBlock, viewConfig.aO)),
				A3(
				author$project$Html$Styled$Bdt$divIf,
				!elm$core$List$isEmpty(viewConfig.aS),
				_List_fromArray(
					[author$project$Card$Css$footer]),
				A2(elm$core$List$map, author$project$Button$render, viewConfig.aS))
			]));
};
var author$project$Card$initialViewConfig = function (isShown) {
	return {aO: _List_Nil, aS: _List_Nil, aT: _List_Nil, aU: '', bQ: isShown};
};
var author$project$Card$view = author$project$Card$initialViewConfig(true);
var author$project$Form$DatePicker$Internal$getSelectedDate = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.g;
	},
	author$project$Resettable$getValue);
var author$project$Form$DatePicker$getSelectedDate = function (_n0) {
	var state = _n0;
	return author$project$Form$DatePicker$Internal$getSelectedDate(state);
};
var rtfeldman$elm_css$Css$position = rtfeldman$elm_css$Css$prop1('position');
var rtfeldman$elm_css$Css$relative = {a3: 0, s: 'relative'};
var author$project$Form$DatePicker$Css$container = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var rtfeldman$elm_css$Css$ellipsis = {dg: 0, s: 'ellipsis'};
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
		return {$: 0, a: a, b: b, c: c};
	});
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
							A2(author$project$Form$DatePicker$Css$input, viewState.aX, viewState.P),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Events$onFocus(
								A3(author$project$Form$DatePicker$Internal$Open, viewState.C, viewState.B, viewState.N))),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3(author$project$Form$DatePicker$Internal$Open, viewState.C, viewState.B, viewState.N)))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									author$project$Form$DatePicker$Css$title(
									_Utils_eq(
										author$project$Resettable$getValue(state.g),
										elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A2(
										elm$core$Maybe$withDefault,
										viewState.aQ,
										A2(
											elm$core$Maybe$map,
											viewState.ah,
											author$project$Resettable$getValue(state.g))))
								])),
							A3(
							author$project$Html$Styled$Bdt$divIf,
							viewState.aY,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$calendar))
								]))
						]))
				]));
	});
var author$project$Form$DatePicker$Internal$Blur = {$: 1};
var rtfeldman$elm_css$Css$absolute = {a3: 0, s: 'absolute'};
var rtfeldman$elm_css$Css$padding = rtfeldman$elm_css$Css$prop1('padding');
var rtfeldman$elm_css$Css$top = rtfeldman$elm_css$Css$prop1('top');
var rtfeldman$elm_css$Css$zIndex = rtfeldman$elm_css$Css$prop1('z-index');
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
var rtfeldman$elm_css$Css$dashed = {x: 0, ae: 0, s: 'dashed'};
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
var justinmimbs$date$Date$RataDie$month = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$RataDie$toCalendarDate,
	function ($) {
		return $.cO;
	});
var justinmimbs$date$Date$RataDie$monthNumber = A2(elm$core$Basics$composeR, justinmimbs$date$Date$RataDie$month, justinmimbs$date$Date$RataDie$monthToNumber);
var justinmimbs$date$Date$monthNumber = function (_n0) {
	var rd = _n0;
	return justinmimbs$date$Date$RataDie$monthNumber(rd);
};
var author$project$Date$Bdt$firstOfMonth = function (date) {
	return A3(
		justinmimbs$date$Date$add,
		1,
		-(justinmimbs$date$Date$monthNumber(date) + 1),
		date);
};
var justinmimbs$date$Date$Days = 3;
var justinmimbs$date$Date$RataDie$day = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$RataDie$toCalendarDate,
	function ($) {
		return $.cr;
	});
var justinmimbs$date$Date$day = function (_n0) {
	var rd = _n0;
	return justinmimbs$date$Date$RataDie$day(rd);
};
var author$project$Date$Bdt$daysInMonth = function (date) {
	return justinmimbs$date$Date$day(
		A3(
			justinmimbs$date$Date$add,
			3,
			-1,
			author$project$Date$Bdt$firstOfMonth(
				A3(justinmimbs$date$Date$add, 1, 1, date))));
};
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
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
var justinmimbs$date$Date$RataDie$weekdayNumber = function (rd) {
	var _n0 = A2(elm$core$Basics$modBy, 7, rd);
	if (!_n0) {
		return 7;
	} else {
		var n = _n0;
		return n;
	}
};
var justinmimbs$date$Date$weekdayNumber = function (_n0) {
	var rd = _n0;
	return justinmimbs$date$Date$RataDie$weekdayNumber(rd);
};
var author$project$Form$DatePicker$Helpers$visibleDays = function (navigationDate) {
	var firstOfMonth = A3(
		justinmimbs$date$Date$add,
		1,
		-(justinmimbs$date$Date$monthNumber(navigationDate) + 1),
		navigationDate);
	var startNumber = justinmimbs$date$Date$weekdayNumber(firstOfMonth);
	var daysInPreviousMonth = author$project$Date$Bdt$daysInMonth(
		author$project$Form$DatePicker$Helpers$previousMonth(navigationDate));
	var tailOfPreviousMonth = A2(
		elm$core$List$map,
		elm$core$Tuple$pair(false),
		A2(
			elm$core$List$drop,
			daysInPreviousMonth - startNumber,
			A2(elm$core$List$range, 1, daysInPreviousMonth)));
	var daysInMonth = author$project$Date$Bdt$daysInMonth(navigationDate);
	var headOfNextMonth = A2(
		elm$core$List$map,
		elm$core$Tuple$pair(false),
		A2(elm$core$List$range, 1, ((6 * 7) - startNumber) - daysInMonth));
	var currentMonth = A2(
		elm$core$List$map,
		elm$core$Tuple$pair(true),
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
	function (isSelected, isSelectedTimeDate, isSelectable) {
		var _n0 = _Utils_Tuple3(isSelected, isSelectedTimeDate, isSelectable);
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
	function (isSelected, isSelectedTimeDate, isSelectable) {
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
				A3(author$project$Form$DatePicker$Css$calendarDayItemColors, isSelected, isSelectedTimeDate, isSelectable)));
	});
var author$project$Form$DatePicker$Helpers$dateAtDayNumber = F2(
	function (dayNumber, date) {
		return A3(justinmimbs$date$Date$add, 3, dayNumber - 1, date);
	});
var author$project$Form$DatePicker$Helpers$isSame = F2(
	function (date1, date2) {
		return _Utils_eq(
			justinmimbs$date$Date$toRataDie(date1),
			justinmimbs$date$Date$toRataDie(date2));
	});
var author$project$Form$DatePicker$Internal$SelectDay = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var author$project$Form$DatePicker$Internal$calendarDay = F4(
	function (state, viewState, firstOfMonth, _n0) {
		var isCurrentMonth = _n0.a;
		var dayNumber = _n0.b;
		var date = A2(author$project$Form$DatePicker$Helpers$dateAtDayNumber, dayNumber, firstOfMonth);
		var isInRange = A2(
			author$project$Form$DatePicker$Helpers$isSame,
			date,
			A3(author$project$Form$DatePicker$Helpers$maybeClamp, viewState.C, viewState.B, date));
		var isSelectedDate = function () {
			var _n2 = author$project$Resettable$getValue(state.g);
			if (_n2.$ === 1) {
				return false;
			} else {
				var selectedDate = _n2.a;
				return A2(author$project$Form$DatePicker$Helpers$isSame, date, selectedDate);
			}
		}();
		var isSelectedDesiredDate = function () {
			var _n1 = state.W;
			if (_n1.$ === 1) {
				return false;
			} else {
				var desiredDate = _n1.a;
				return A2(author$project$Form$DatePicker$Helpers$isSame, date, desiredDate);
			}
		}();
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A3(author$project$Form$DatePicker$Css$calendarDayItem, isSelectedDate, isSelectedDesiredDate, isCurrentMonth && isInRange),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					isCurrentMonth && isInRange,
					rtfeldman$elm_css$Html$Styled$Events$onClick(
						A2(author$project$Form$DatePicker$Internal$SelectDay, date, viewState.N)))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					elm$core$String$fromInt(dayNumber))
				]));
	});
var author$project$Form$DatePicker$Internal$calendarDayRow = F4(
	function (state, viewState, firstOfMonth, row) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$DatePicker$Css$calendarDayRow]),
			A2(
				elm$core$List$map,
				A3(author$project$Form$DatePicker$Internal$calendarDay, state, viewState, firstOfMonth),
				row));
	});
var author$project$Form$DatePicker$Internal$calendarDays = F3(
	function (state, viewState, navigationDate) {
		var rows = author$project$Form$DatePicker$Helpers$visibleDays(navigationDate);
		var firstOfMonth = author$project$Date$Bdt$firstOfMonth(navigationDate);
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			A2(
				elm$core$List$map,
				A3(author$project$Form$DatePicker$Internal$calendarDayRow, state, viewState, firstOfMonth),
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
var justinmimbs$date$Date$year = function (_n0) {
	var rd = _n0;
	return justinmimbs$date$Date$RataDie$year(rd);
};
var author$project$Form$DatePicker$Internal$calendarNavigationTitle = function (date) {
	return elm$core$String$fromInt(
		justinmimbs$date$Date$year(date)) + (' - ' + A3(
		elm$core$String$pad,
		2,
		'0',
		elm$core$String$fromInt(
			justinmimbs$date$Date$monthNumber(date))));
};
var elm$svg$Svg$polyline = elm$svg$Svg$trustedNode('polyline');
var 1602$elm_feather$FeatherIcons$chevronRight = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'chevron-right',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var author$project$Form$DatePicker$Internal$NextMonth = {$: 6};
var author$project$Form$DatePicker$Internal$nextMonthArrow = F2(
	function (viewState, navigationDate) {
		var isDisabled = _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$year, viewState.B),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$year(navigationDate))) && _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$monthNumber, viewState.B),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$monthNumber(navigationDate)));
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
					A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronRight))
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
	return {$: 5, a: a};
};
var author$project$Form$DatePicker$Internal$nextYearArrow = F2(
	function (viewState, navigationDate) {
		var isDisabled = _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$year, viewState.B),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$year(navigationDate))) && _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$monthNumber, viewState.B),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$monthNumber(navigationDate)));
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$DatePicker$Css$yearArrows(isDisabled),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!isDisabled,
					rtfeldman$elm_css$Html$Styled$Events$onClick(
						author$project$Form$DatePicker$Internal$NextYear(viewState.B)))
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
							A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronRight))
						])),
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronRight))
				]));
	});
var 1602$elm_feather$FeatherIcons$chevronLeft = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'chevron-left',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var author$project$Form$DatePicker$Internal$PreviousMonth = {$: 4};
var author$project$Form$DatePicker$Internal$previousMonthArrow = F2(
	function (viewState, navigationDate) {
		var isDisabled = _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$year, viewState.C),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$year(navigationDate))) && _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$monthNumber, viewState.C),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$monthNumber(navigationDate)));
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
					A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronLeft))
				]));
	});
var author$project$Form$DatePicker$Internal$PreviousYear = function (a) {
	return {$: 3, a: a};
};
var author$project$Form$DatePicker$Internal$previousYearArrow = F2(
	function (viewState, navigationDate) {
		var isDisabled = _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$year, viewState.C),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$year(navigationDate))) && _Utils_eq(
			A2(elm$core$Maybe$map, justinmimbs$date$Date$monthNumber, viewState.C),
			elm$core$Maybe$Just(
				justinmimbs$date$Date$monthNumber(navigationDate)));
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					author$project$Form$DatePicker$Css$yearArrows(isDisabled),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!isDisabled,
					rtfeldman$elm_css$Html$Styled$Events$onClick(
						author$project$Form$DatePicker$Internal$PreviousYear(viewState.C)))
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
							A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronLeft))
						])),
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronLeft))
				]));
	});
var author$project$Form$DatePicker$Internal$calendarNavigation = F3(
	function (state, viewState, navigationDate) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$DatePicker$Css$navigation]),
			_List_fromArray(
				[
					A2(author$project$Form$DatePicker$Internal$previousYearArrow, viewState, navigationDate),
					A2(author$project$Form$DatePicker$Internal$previousMonthArrow, viewState, navigationDate),
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[author$project$Form$DatePicker$Css$date]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(
							author$project$Form$DatePicker$Internal$calendarNavigationTitle(navigationDate))
						])),
					A2(author$project$Form$DatePicker$Internal$nextMonthArrow, viewState, navigationDate),
					A2(author$project$Form$DatePicker$Internal$nextYearArrow, viewState, navigationDate)
				]));
	});
var rtfeldman$elm_css$Css$PtUnits = 0;
var rtfeldman$elm_css$Css$pt = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'pt');
var rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var rtfeldman$elm_css$Css$textTransform = rtfeldman$elm_css$Css$prop1('text-transform');
var rtfeldman$elm_css$Css$uppercase = {af: 0, s: 'uppercase'};
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
var rtfeldman$elm_css$Css$prop4 = F5(
	function (key, argA, argB, argC, argD) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.s, argB.s, argC.s, argD.s])));
	});
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
var author$project$Form$DatePicker$Internal$Clear = {$: 13};
var author$project$Form$DatePicker$Internal$clearDateButton = function (state) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				author$project$Form$DatePicker$Css$clearButton(
				!_Utils_eq(
					author$project$Resettable$getValue(state.g),
					elm$core$Maybe$Nothing)),
				A2(
				author$project$Html$Styled$Bdt$attributeIf,
				!_Utils_eq(
					author$project$Resettable$getValue(state.g),
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
			viewState.bs,
			author$project$Form$DatePicker$Internal$clearDateButton(state));
	});
var elm$json$Json$Decode$fail = _Json_fail;
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
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
	elm$json$Json$Decode$fail('mouseDownDisabled'));
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
var author$project$Form$DatePicker$Internal$Apply = {$: 12};
var author$project$Form$DatePicker$Internal$OpenTimeSelect = function (a) {
	return {$: 8, a: a};
};
var 1602$elm_feather$FeatherIcons$chevronDown = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'chevron-down',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var author$project$Form$Select$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$select, isError, isLocked));
	});
var author$project$Form$Select$Css$title = function (isFaded) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		author$project$Form$Css$title(isFaded));
};
var author$project$Form$Select$Internal$Open = {$: 0};
var 1602$elm_feather$FeatherIcons$x = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'x',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var author$project$Form$Select$Internal$Clear = {$: 3};
var author$project$Form$Select$Internal$clearButton = F2(
	function (state, viewState) {
		return A3(
			author$project$Html$Styled$Bdt$divIf,
			viewState.bs && (!_Utils_eq(
				author$project$Resettable$getValue(state.k),
				elm$core$Maybe$Nothing)),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'mousedown',
					elm$json$Json$Decode$succeed(
						_Utils_Tuple2(author$project$Form$Select$Internal$Clear, true)))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$x))
				]));
	});
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
							A2(author$project$Form$Select$Css$input, viewState.aX, viewState.P),
							A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.bq),
							rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.P),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Events$onFocus(author$project$Form$Select$Internal$Open)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
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
										viewState.aQ,
										A2(
											elm$core$Maybe$map,
											viewState.ah,
											author$project$Resettable$getValue(state.k)))),
									author$project$Form$Select$Css$title(
									_Utils_eq(
										author$project$Resettable$getValue(state.k),
										elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A2(
										elm$core$Maybe$withDefault,
										viewState.aQ,
										A2(
											elm$core$Maybe$map,
											viewState.ah,
											author$project$Resettable$getValue(state.k))))
								])),
							A2(author$project$Form$Select$Internal$clearButton, state, viewState),
							rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronDown))
						]))
				]));
	});
var author$project$Form$Helpers$Down = 1;
var author$project$Form$Helpers$Up = 0;
var author$project$Form$Helpers$upDownDecoder = function (key) {
	switch (key) {
		case 'ArrowUp':
			return elm$json$Json$Decode$succeed(0);
		case 'ArrowDown':
			return elm$json$Json$Decode$succeed(1);
		default:
			return elm$json$Json$Decode$fail('Not ArrowUp or ArrowDown');
	}
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var author$project$Form$Helpers$onUpDown = function (msg) {
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
				author$project$Form$Helpers$upDownDecoder,
				A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string))));
};
var author$project$Form$Select$Css$container = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var author$project$Form$Select$Internal$Blur = {$: 1};
var author$project$Form$Select$Internal$UpDown = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var rtfeldman$elm_css$Css$borderTopColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'border-top-color', c.s);
};
var rtfeldman$elm_css$Css$left = rtfeldman$elm_css$Css$prop1('left');
var rtfeldman$elm_css$Css$maxHeight = rtfeldman$elm_css$Css$prop1('max-height');
var rtfeldman$elm_css$Css$overflowY = rtfeldman$elm_css$Css$prop1('overflow-y');
var rtfeldman$elm_css$Css$right = rtfeldman$elm_css$Css$prop1('right');
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
var author$project$Form$Helpers$spaceEnterDecoder = F2(
	function (msg, key) {
		switch (key) {
			case ' ':
				return elm$json$Json$Decode$succeed(msg);
			case 'Enter':
				return elm$json$Json$Decode$succeed(msg);
			default:
				return elm$json$Json$Decode$fail('Not Space or Enter');
		}
	});
var author$project$Form$Helpers$onSpaceEnter = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
		'keydown',
		A2(
			elm$json$Json$Decode$map,
			function (decoder) {
				return _Utils_Tuple2(decoder, true);
			},
			A2(
				elm$json$Json$Decode$andThen,
				author$project$Form$Helpers$spaceEnterDecoder(msg),
				A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string))));
};
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
				isDisabled || isFocused,
				rtfeldman$elm_css$Css$backgroundColor(
					rtfeldman$elm_css$Css$hex('f2f9fc'))),
				rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
				rtfeldman$elm_css$Css$outlineWidth(
				rtfeldman$elm_css$Css$px(0)),
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
var author$project$Form$Select$Internal$BlurOption = function (a) {
	return {$: 6, a: a};
};
var author$project$Form$Select$Internal$Focus = function (a) {
	return {$: 5, a: a};
};
var author$project$Form$Select$Internal$Select = function (a) {
	return {$: 2, a: a};
};
var rtfeldman$elm_css$Html$Styled$Events$onBlur = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'blur',
		elm$json$Json$Decode$succeed(msg));
};
var rtfeldman$elm_css$Html$Styled$Events$onMouseDown = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'mousedown',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Form$Select$Internal$optionItem = F3(
	function (state, viewState, option) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A2(
					author$project$Form$Select$Css$optionItem,
					viewState.a_(option),
					_Utils_eq(
						state.A,
						elm$core$Maybe$Just(option))),
					rtfeldman$elm_css$Html$Styled$Attributes$id(
					A2(author$project$Form$Helpers$toHtmlId, viewState.ah, option)),
					rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
					rtfeldman$elm_css$Html$Styled$Events$onFocus(
					author$project$Form$Select$Internal$Focus(option)),
					rtfeldman$elm_css$Html$Styled$Events$onBlur(
					author$project$Form$Select$Internal$BlurOption(option)),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!viewState.a_(option),
					rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
						author$project$Form$Select$Internal$Select(option))),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!viewState.a_(option),
					author$project$Form$Helpers$onSpaceEnter(
						author$project$Form$Select$Internal$Select(option)))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					viewState.ah(option))
				]));
	});
var author$project$Form$Select$Internal$optionList = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[author$project$Form$Select$Css$optionList]),
			A2(
				elm$core$List$map,
				A2(author$project$Form$Select$Internal$optionItem, state, viewState),
				mgold$elm_nonempty_list$List$Nonempty$toList(state.a2)));
	});
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
							A2(author$project$Form$Select$Css$input, viewState.aX, viewState.P),
							A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.bq),
							author$project$Form$Helpers$onUpDown(
							author$project$Form$Select$Internal$UpDown(viewState.ah)),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
							rtfeldman$elm_css$Html$Styled$Events$onBlur(author$project$Form$Select$Internal$Blur)
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
										viewState.aQ,
										A2(
											elm$core$Maybe$map,
											viewState.ah,
											author$project$Resettable$getValue(state.k)))),
									author$project$Form$Select$Css$title(
									_Utils_eq(
										author$project$Resettable$getValue(state.k),
										elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A2(
										elm$core$Maybe$withDefault,
										viewState.aQ,
										A2(
											elm$core$Maybe$map,
											viewState.ah,
											author$project$Resettable$getValue(state.k))))
								]))
						])),
					A2(author$project$Form$Select$Internal$optionList, state, viewState)
				]));
	});
var elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
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
			case 4:
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 0:
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
			case 1:
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
			case 2:
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
			case 4:
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					styles);
			case 0:
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
			case 1:
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
			case 2:
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
		return A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
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
	if (_n0.$ === 1) {
		return elm$core$Dict$empty;
	} else {
		var _n1 = _n0.a;
		var classname = _n1.a;
		var styles = _n1.b;
		return A2(elm$core$Dict$singleton, classname, styles);
	}
};
var rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 0, a: a};
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
		case 4:
			var plainNode = vdom.a;
			return plainNode;
		case 0:
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 1:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 2:
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
		var _n0 = state.Q;
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$Select$Internal$setId = F2(
	function (id, viewState) {
		return _Utils_update(
			viewState,
			{
				bq: elm$core$Maybe$Just(id)
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
		aQ: '-- Nothing Selected --',
		bq: elm$core$Maybe$Nothing,
		bs: false,
		aX: false,
		P: false,
		a_: elm$core$Basics$always(false),
		ah: toLabel
	};
};
var author$project$Form$Select$view = F2(
	function (_n0, toLabel) {
		var state = _n0;
		return A2(
			author$project$Form$Select$View,
			state,
			author$project$Form$Select$Internal$initialViewState(toLabel));
	});
var rtfeldman$elm_css$VirtualDom$Styled$KeyedNode = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
	function (a, b, c, d) {
		return {$: 3, a: a, b: b, c: c, d: d};
	});
var rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
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
			case 0:
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
			case 1:
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
			case 2:
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
			case 3:
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
var author$project$Form$DatePicker$Internal$timePicker = function (state) {
	var isDesiredDateSelected = !_Utils_eq(state.W, elm$core$Maybe$Nothing);
	var isDateSelected = !_Utils_eq(
		author$project$Resettable$getValue(state.g),
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
							state.q,
							elm$core$Maybe$Just(0)),
						rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
							author$project$Form$DatePicker$Internal$OpenTimeSelect(0)))
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
										A2(author$project$Form$Select$view, state.dL, elm$core$String$fromInt))))
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
							state.q,
							elm$core$Maybe$Just(1)),
						rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
							author$project$Form$DatePicker$Internal$OpenTimeSelect(1)))
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
										A2(author$project$Form$Select$view, state.dU, elm$core$String$fromInt))))
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
							state.q,
							elm$core$Maybe$Just(2)),
						rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
							author$project$Form$DatePicker$Internal$OpenTimeSelect(2)))
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
										A2(author$project$Form$Select$view, state.d5, elm$core$String$fromInt))))
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
		var _n0 = state.r;
		if (_n0.$ === 1) {
			return rtfeldman$elm_css$Html$Styled$text('');
		} else {
			var date = _n0.a;
			return A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Form$DatePicker$Css$calendar,
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						_Utils_eq(state.W, elm$core$Maybe$Nothing),
						author$project$Form$DatePicker$Internal$disableMouseDown)
					]),
				_List_fromArray(
					[
						A3(author$project$Form$DatePicker$Internal$calendarNavigation, state, viewState, date),
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
								A3(author$project$Form$DatePicker$Internal$calendarDays, state, viewState, date)
							])),
						A2(author$project$Form$DatePicker$Internal$timePickerContainer, state, viewState.N),
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
							A2(author$project$Form$DatePicker$Css$input, viewState.P, viewState.aX),
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
										author$project$Resettable$getValue(state.g),
										elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A2(
										elm$core$Maybe$withDefault,
										viewState.aQ,
										A2(
											elm$core$Maybe$map,
											viewState.ah,
											author$project$Resettable$getValue(state.g))))
								])),
							A3(
							author$project$Html$Styled$Bdt$divIf,
							viewState.aY,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$calendar))
								]))
						])),
					A2(author$project$Form$DatePicker$Internal$calendar, state, viewState)
				]));
	});
var author$project$Form$DatePicker$Internal$render = F2(
	function (state, viewState) {
		var _n0 = state.Q;
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$DatePicker$Helpers$dateToString = function (date) {
	var year = elm$core$String$fromInt(
		justinmimbs$date$Date$year(date));
	var month = A3(
		elm$core$String$pad,
		2,
		'0',
		elm$core$String$fromInt(
			justinmimbs$date$Date$monthNumber(date)));
	var day = A3(
		elm$core$String$pad,
		2,
		'0',
		elm$core$String$fromInt(
			justinmimbs$date$Date$day(date)));
	return A2(
		elm$core$String$join,
		'/',
		_List_fromArray(
			[day, month, year]));
};
var author$project$Form$DatePicker$Helpers$toLabel = author$project$Form$DatePicker$Helpers$dateToString;
var author$project$Form$DatePicker$Internal$setIncludeTime = F2(
	function (includeTime, viewState) {
		if (includeTime) {
			return _Utils_update(
				viewState,
				{N: true, ah: author$project$Form$DatePicker$Helpers$toLabel});
		} else {
			return _Utils_update(
				viewState,
				{N: false, ah: author$project$Form$DatePicker$Helpers$toLabel});
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
			{bs: isClearable});
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
var author$project$Form$DatePicker$Internal$setMaxDate = F2(
	function (date, viewState) {
		return _Utils_update(
			viewState,
			{B: date});
	});
var author$project$Form$DatePicker$setMaxDate = F2(
	function (date, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$DatePicker$View,
			state,
			A2(author$project$Form$DatePicker$Internal$setMaxDate, date, viewState));
	});
var author$project$Form$DatePicker$Internal$setMinDate = F2(
	function (date, viewState) {
		return _Utils_update(
			viewState,
			{C: date});
	});
var author$project$Form$DatePicker$setMinDate = F2(
	function (date, _n0) {
		var state = _n0.a;
		var viewState = _n0.b;
		return A2(
			author$project$Form$DatePicker$View,
			state,
			A2(author$project$Form$DatePicker$Internal$setMinDate, date, viewState));
	});
var author$project$Form$DatePicker$Internal$initialViewState = {aQ: '-- Nothing Selected --', bq: elm$core$Maybe$Nothing, N: false, bs: false, aX: false, aY: true, P: false, B: elm$core$Maybe$Nothing, C: elm$core$Maybe$Nothing, ah: author$project$Form$DatePicker$Helpers$toLabel};
var author$project$Form$DatePicker$view = function (_n0) {
	var state = _n0;
	return A2(author$project$Form$DatePicker$View, state, author$project$Form$DatePicker$Internal$initialViewState);
};
var elm$core$String$toFloat = _String_toFloat;
var author$project$Form$FloatInput$Internal$getValue = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.s;
	},
	A2(elm$core$Basics$composeR, author$project$Resettable$getValue, elm$core$String$toFloat));
var author$project$Form$FloatInput$getValue = function (_n0) {
	var state = _n0;
	return author$project$Form$FloatInput$Internal$getValue(state);
};
var author$project$Form$FloatInput$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$input, isError, isLocked));
	});
var author$project$Form$FloatInput$Internal$Input = elm$core$Basics$identity;
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
	return {$: 1, a: a};
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
					A2(author$project$Form$FloatInput$Css$input, viewState.aX, viewState.P),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.P),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.s)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(elm$core$Basics$identity),
					rtfeldman$elm_css$Html$Styled$Attributes$placeholder(viewState.bA),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.bw),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.bq)
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$FloatInput$Internal$initialViewState = {bq: elm$core$Maybe$Nothing, aX: false, P: false, bw: elm$core$Maybe$Nothing, bA: ''};
var author$project$Form$FloatInput$view = function (_n0) {
	var state = _n0;
	return A2(author$project$Form$FloatInput$View, state, author$project$Form$FloatInput$Internal$initialViewState);
};
var author$project$Form$Input$Internal$getValue = function (state) {
	return author$project$Resettable$getValue(state.s);
};
var author$project$Form$Input$getValue = function (_n0) {
	var state = _n0;
	return author$project$Form$Input$Internal$getValue(state);
};
var author$project$Form$Input$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$input, isError, isLocked));
	});
var author$project$Form$Input$Internal$Input = elm$core$Basics$identity;
var author$project$Form$Input$Internal$typeToString = function (inputType) {
	switch (inputType) {
		case 0:
			return 'text';
		case 1:
			return 'email';
		case 2:
			return 'password';
		case 3:
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
					A2(author$project$Form$Input$Css$input, viewState.aX, viewState.P),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.P),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.s)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(elm$core$Basics$identity),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$placeholder, viewState.bA),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.bw),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.bq),
					rtfeldman$elm_css$Html$Styled$Attributes$type_(
					author$project$Form$Input$Internal$typeToString(viewState.O))
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$Input$Internal$Text = 0;
var author$project$Form$Input$Internal$initialViewState = {bq: elm$core$Maybe$Nothing, O: 0, aX: false, P: false, bw: elm$core$Maybe$Nothing, bA: elm$core$Maybe$Nothing};
var author$project$Form$Input$view = function (_n0) {
	var state = _n0;
	return A2(author$project$Form$Input$View, state, author$project$Form$Input$Internal$initialViewState);
};
var author$project$Form$IntInput$Internal$getValue = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.s;
	},
	A2(elm$core$Basics$composeR, author$project$Resettable$getValue, elm$core$String$toInt));
var author$project$Form$IntInput$getValue = function (_n0) {
	var state = _n0;
	return author$project$Form$IntInput$Internal$getValue(state);
};
var author$project$Form$IntInput$Css$input = F2(
	function (isError, isLocked) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$input, isError, isLocked));
	});
var author$project$Form$IntInput$Internal$Input = elm$core$Basics$identity;
var author$project$Form$IntInput$Internal$inputField = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$input,
			_List_fromArray(
				[
					A2(author$project$Form$IntInput$Css$input, viewState.aX, viewState.P),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.P),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.s)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(elm$core$Basics$identity),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$placeholder, viewState.bA),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.bw),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.bq)
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$IntInput$Internal$initialViewState = {bq: elm$core$Maybe$Nothing, aX: false, P: false, bw: elm$core$Maybe$Nothing, bA: elm$core$Maybe$Nothing};
var author$project$Form$IntInput$view = function (_n0) {
	var state = _n0;
	return A2(author$project$Form$IntInput$View, state, author$project$Form$IntInput$Internal$initialViewState);
};
var author$project$Form$Label$Label = elm$core$Basics$identity;
var author$project$Form$Label$mandatory = F2(
	function (bool, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{bv: bool});
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
	var config = _n0;
	return A2(
		rtfeldman$elm_css$Html$Styled$label,
		_List_fromArray(
			[author$project$Form$Label$Css$label]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$text(config.b3),
				A3(
				author$project$Html$Styled$Bdt$divIf,
				config.bv,
				_List_fromArray(
					[author$project$Form$Label$Css$mandatory]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('*')
					]))
			]));
};
var author$project$Form$Label$initialConfig = function (text) {
	return {bv: false, b3: text};
};
var author$project$Form$Label$view = A2(elm$core$Basics$composeR, author$project$Form$Label$initialConfig, elm$core$Basics$identity);
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
var author$project$Form$MultiSelect$Internal$Open = {$: 0};
var author$project$Form$MultiSelect$Internal$Clear = {$: 3};
var author$project$Form$MultiSelect$Internal$clearButton = F2(
	function (state, viewState) {
		return A3(
			author$project$Html$Styled$Bdt$divIf,
			viewState.bs && elm$core$List$isEmpty(
				author$project$Resettable$getValue(state.h)),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'mousedown',
					elm$json$Json$Decode$succeed(
						_Utils_Tuple2(author$project$Form$MultiSelect$Internal$Clear, true)))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$x))
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
							A2(author$project$Form$MultiSelect$Css$input, viewState.aX, viewState.P),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
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
										author$project$Resettable$getValue(state.h))),
									rtfeldman$elm_css$Html$Styled$Attributes$title(
									A3(author$project$Form$MultiSelect$Internal$optionText, viewState.aQ, viewState.ah, state.h))
								]),
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text(
									A3(author$project$Form$MultiSelect$Internal$optionText, viewState.aQ, viewState.ah, state.h))
								])),
							A2(author$project$Form$MultiSelect$Internal$clearButton, state, viewState),
							A3(
							author$project$Html$Styled$Bdt$divIf,
							!viewState.P,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$fromUnstyled(
									A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$chevronDown))
								]))
						]))
				]));
	});
var author$project$Form$MultiSelect$Internal$Blur = {$: 1};
var author$project$Form$MultiSelect$Internal$UpDown = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var author$project$Form$MultiSelect$Css$optionList = rtfeldman$elm_css$Html$Styled$Attributes$css(author$project$Form$Css$selectOptionList);
var 1602$elm_feather$FeatherIcons$checkSquare = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'check-square',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var 1602$elm_feather$FeatherIcons$square = A2(
	1602$elm_feather$FeatherIcons$makeBuilder,
	'square',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
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
var author$project$Form$MultiSelect$Css$checkBox = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$marginRight(
			rtfeldman$elm_css$Css$px(6))
		]));
var author$project$Form$MultiSelect$Css$optionItem = F2(
	function (isDisabled, isFocused) {
		return rtfeldman$elm_css$Html$Styled$Attributes$css(
			A2(author$project$Form$Css$selectOptionItem, isDisabled, isFocused));
	});
var author$project$Form$MultiSelect$Internal$BlurOption = function (a) {
	return {$: 6, a: a};
};
var author$project$Form$MultiSelect$Internal$Focus = function (a) {
	return {$: 5, a: a};
};
var author$project$Form$MultiSelect$Internal$Select = function (a) {
	return {$: 2, a: a};
};
var author$project$Form$MultiSelect$Internal$handleMouseDown = F2(
	function (selectedOptions, option) {
		return A2(
			rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
			'mousedown',
			elm$json$Json$Decode$succeed(
				_Utils_Tuple2(
					author$project$Form$MultiSelect$Internal$Select(option),
					true)));
	});
var author$project$Form$MultiSelect$Internal$optionItem = F3(
	function (state, viewState, option) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A2(
					author$project$Form$MultiSelect$Css$optionItem,
					viewState.a_(option),
					_Utils_eq(
						state.A,
						elm$core$Maybe$Just(option))),
					rtfeldman$elm_css$Html$Styled$Attributes$id(
					A2(author$project$Form$Helpers$toHtmlId, viewState.ah, option)),
					rtfeldman$elm_css$Html$Styled$Events$onFocus(
					author$project$Form$MultiSelect$Internal$Focus(option)),
					rtfeldman$elm_css$Html$Styled$Events$onBlur(
					author$project$Form$MultiSelect$Internal$BlurOption(option)),
					A2(author$project$Form$MultiSelect$Internal$handleMouseDown, state.h, option),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					!viewState.a_(option),
					author$project$Form$Helpers$onSpaceEnter(
						author$project$Form$MultiSelect$Internal$Select(option))),
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
							author$project$Resettable$getValue(state.h)) ? rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$checkSquare)) : rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$square))
						])),
					rtfeldman$elm_css$Html$Styled$text(
					viewState.ah(option))
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
				mgold$elm_nonempty_list$List$Nonempty$toList(state.a2)));
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
							A2(author$project$Form$MultiSelect$Css$input, viewState.aX, viewState.P),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
							rtfeldman$elm_css$Html$Styled$Events$onBlur(author$project$Form$MultiSelect$Internal$Blur),
							author$project$Form$Helpers$onUpDown(
							author$project$Form$MultiSelect$Internal$UpDown(viewState.ah)),
							author$project$Form$MultiSelect$Css$title(
							elm$core$List$isEmpty(
								author$project$Resettable$getValue(state.h))),
							rtfeldman$elm_css$Html$Styled$Attributes$title(
							A3(author$project$Form$MultiSelect$Internal$optionText, viewState.aQ, viewState.ah, state.h))
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(
							A3(author$project$Form$MultiSelect$Internal$optionText, viewState.aQ, viewState.ah, state.h))
						])),
					A2(author$project$Form$MultiSelect$Internal$optionList, state, viewState)
				]));
	});
var author$project$Form$MultiSelect$Internal$render = F2(
	function (state, viewState) {
		var _n0 = state.Q;
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$MultiSelect$Internal$initialViewState = function (toLabel) {
	return {
		aQ: '-- Nothing Selected --',
		bq: elm$core$Maybe$Nothing,
		bs: false,
		aX: false,
		P: false,
		a_: elm$core$Basics$always(false),
		ah: toLabel
	};
};
var author$project$Form$MultiSelect$view = F2(
	function (_n0, toLabel) {
		var state = _n0;
		return A2(
			author$project$Form$MultiSelect$View,
			state,
			author$project$Form$MultiSelect$Internal$initialViewState(toLabel));
	});
var author$project$Form$SearchSelect$Internal$getSelectedOption = function (state) {
	return author$project$Resettable$getValue(state.k);
};
var author$project$Form$SearchSelect$getSelectedOption = function (_n0) {
	var state = _n0;
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
var author$project$Form$SearchSelect$Internal$Open = {$: 0};
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
							A2(author$project$Form$SearchSelect$Css$input, viewState.aX, viewState.P),
							author$project$Form$SearchSelect$Css$title(
							_Utils_eq(
								author$project$Resettable$getValue(state.k),
								elm$core$Maybe$Nothing)),
							A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.bq),
							rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
							rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.P),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Events$onFocus(author$project$Form$SearchSelect$Internal$Open)),
							A2(
							author$project$Html$Styled$Bdt$attributeIf,
							!viewState.P,
							rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Form$SearchSelect$Internal$Open)),
							rtfeldman$elm_css$Html$Styled$Attributes$value(
							A2(
								elm$core$Maybe$withDefault,
								'',
								A2(
									elm$core$Maybe$map,
									viewState.ah,
									author$project$Resettable$getValue(state.k))))
						]),
					_List_Nil)
				]));
	});
var author$project$Form$SearchSelect$Internal$Blur = {$: 1};
var author$project$Form$SearchSelect$Internal$UpDown = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var author$project$Form$SearchSelect$Internal$UpdateSearchInput = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Form$SearchSelect$Internal$InputMinimum = function (a) {
	return {$: 0, a: a};
};
var author$project$Form$SearchSelect$Internal$NoResults = {$: 2};
var author$project$Form$SearchSelect$Internal$Searching = {$: 1};
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
		case 0:
			var _int = message.a;
			return author$project$Form$SearchSelect$Internal$infoMessageContainer(
				'please type at least ' + (elm$core$String$fromInt(_int) + ' characters to search'));
		case 1:
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
var author$project$Form$Helpers$enterDecoder = F2(
	function (msg, key) {
		if (key === 'Enter') {
			return elm$json$Json$Decode$succeed(msg);
		} else {
			return elm$json$Json$Decode$fail('Not Space');
		}
	});
var author$project$Form$Helpers$onEnter = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
		'keydown',
		A2(
			elm$json$Json$Decode$map,
			function (decoder) {
				return _Utils_Tuple2(decoder, true);
			},
			A2(
				elm$json$Json$Decode$andThen,
				author$project$Form$Helpers$enterDecoder(msg),
				A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string))));
};
var author$project$Form$SearchSelect$Css$optionItem = function (isFocused) {
	return rtfeldman$elm_css$Html$Styled$Attributes$css(
		A2(author$project$Form$Css$selectOptionItem, false, isFocused));
};
var author$project$Form$SearchSelect$Internal$BlurOption = function (a) {
	return {$: 8, a: a};
};
var author$project$Form$SearchSelect$Internal$Focus = function (a) {
	return {$: 7, a: a};
};
var author$project$Form$SearchSelect$Internal$Select = function (a) {
	return {$: 4, a: a};
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
					rtfeldman$elm_css$Html$Styled$Attributes$id(
					A2(author$project$Form$Helpers$toHtmlId, toLabel, option)),
					rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
					author$project$Form$SearchSelect$Internal$Select(option)),
					rtfeldman$elm_css$Html$Styled$Events$onFocus(
					author$project$Form$SearchSelect$Internal$Focus(option)),
					rtfeldman$elm_css$Html$Styled$Events$onBlur(
					author$project$Form$SearchSelect$Internal$BlurOption(option)),
					author$project$Form$Helpers$onEnter(
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
				A2(author$project$Form$SearchSelect$Internal$searchResultItem, state.A, viewState.ah),
				state.a2));
	});
var author$project$Form$SearchSelect$Internal$searchResults = F2(
	function (state, viewState) {
		var _n0 = A2(author$project$Form$SearchSelect$Internal$shouldSearch, viewState.aV, state.Z);
		if (!_n0) {
			return author$project$Form$SearchSelect$Internal$infoMessage(
				author$project$Form$SearchSelect$Internal$InputMinimum(viewState.aV));
		} else {
			var _n1 = state.av;
			if (_n1) {
				return author$project$Form$SearchSelect$Internal$infoMessage(author$project$Form$SearchSelect$Internal$Searching);
			} else {
				var _n2 = elm$core$List$isEmpty(state.a2);
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
							A2(author$project$Form$SearchSelect$Css$input, viewState.P, viewState.aX),
							author$project$Form$SearchSelect$Css$title(
							_Utils_eq(
								author$project$Resettable$getValue(state.k),
								elm$core$Maybe$Nothing)),
							rtfeldman$elm_css$Html$Styled$Attributes$id('OPEN_SEARCH_SELECT'),
							rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
							rtfeldman$elm_css$Html$Styled$Attributes$placeholder(
							A2(
								elm$core$Maybe$withDefault,
								'',
								A2(
									elm$core$Maybe$map,
									viewState.ah,
									author$project$Resettable$getValue(state.k)))),
							rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
							rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.P),
							rtfeldman$elm_css$Html$Styled$Events$onInput(
							author$project$Form$SearchSelect$Internal$UpdateSearchInput(viewState.aV)),
							rtfeldman$elm_css$Html$Styled$Events$onBlur(author$project$Form$SearchSelect$Internal$Blur),
							author$project$Form$Helpers$onUpDown(
							author$project$Form$SearchSelect$Internal$UpDown(viewState.ah)),
							rtfeldman$elm_css$Html$Styled$Attributes$value(state.Z)
						]),
					_List_Nil),
					A2(author$project$Form$SearchSelect$Internal$searchResults, state, viewState)
				]));
	});
var author$project$Form$SearchSelect$Internal$render = F2(
	function (state, viewState) {
		var _n0 = state.Q;
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$SearchSelect$Internal$initialViewState = function (toLabel) {
	return {
		aQ: '-- Nothing Selected --',
		bq: elm$core$Maybe$Nothing,
		aV: 2,
		bs: false,
		aX: false,
		P: false,
		a_: elm$core$Basics$always(false),
		ah: toLabel
	};
};
var author$project$Form$SearchSelect$view = F2(
	function (_n0, toLabel) {
		var state = _n0;
		return A2(
			author$project$Form$SearchSelect$View,
			state,
			author$project$Form$SearchSelect$Internal$initialViewState(toLabel));
	});
var author$project$Form$Select$Internal$getSelectedOption = function (state) {
	return author$project$Resettable$getValue(state.k);
};
var author$project$Form$Select$getSelectedOption = function (_n0) {
	var state = _n0;
	return author$project$Form$Select$Internal$getSelectedOption(state);
};
var author$project$Form$Select$Internal$setIsClearable = F2(
	function (isClearable, viewState) {
		return _Utils_update(
			viewState,
			{bs: isClearable});
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
			{a_: isOptionDisabled});
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
var author$project$Form$TextArea$Internal$Input = function (a) {
	return {$: 0, a: a};
};
var author$project$Form$TextArea$Internal$Tab = function (a) {
	return {$: 1, a: a};
};
var author$project$Form$TextArea$Internal$shouldUpdateTab = function (keyCode) {
	if (keyCode === 9) {
		return A2(
			elm$json$Json$Decode$andThen,
			A2(elm$core$Basics$composeL, elm$json$Json$Decode$succeed, author$project$Form$TextArea$Internal$Tab),
			rtfeldman$elm_css$Html$Styled$Events$targetValue);
	} else {
		return elm$json$Json$Decode$fail('Not Tab');
	}
};
var rtfeldman$elm_css$Html$Styled$textarea = rtfeldman$elm_css$Html$Styled$node('textarea');
var rtfeldman$elm_css$Html$Styled$Attributes$attribute = rtfeldman$elm_css$VirtualDom$Styled$attribute;
var rtfeldman$elm_css$Html$Styled$Events$keyCode = A2(elm$json$Json$Decode$field, 'keyCode', elm$json$Json$Decode$int);
var author$project$Form$TextArea$Internal$inputField = F2(
	function (state, viewState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$textarea,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					A2(author$project$Form$Css$input, viewState.aX, viewState.P)),
					rtfeldman$elm_css$Html$Styled$Attributes$disabled(viewState.P),
					rtfeldman$elm_css$Html$Styled$Attributes$value(
					author$project$Resettable$getValue(state.s)),
					rtfeldman$elm_css$Html$Styled$Events$onInput(author$project$Form$TextArea$Internal$Input),
					rtfeldman$elm_css$Html$Styled$Attributes$placeholder(viewState.bA),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$maxlength, viewState.bw),
					A2(author$project$Html$Styled$Bdt$maybeAttribute, rtfeldman$elm_css$Html$Styled$Attributes$id, viewState.bq),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					state.a7,
					A2(rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'onkeydown', 'if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+\'\t\'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}')),
					A2(
					author$project$Html$Styled$Bdt$attributeIf,
					state.a7,
					A2(
						rtfeldman$elm_css$Html$Styled$Events$on,
						'keyup',
						A2(elm$json$Json$Decode$andThen, author$project$Form$TextArea$Internal$shouldUpdateTab, rtfeldman$elm_css$Html$Styled$Events$keyCode)))
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
		return {$: 0, a: a, b: b};
	});
var author$project$Form$TextArea$Internal$initialViewState = {bq: elm$core$Maybe$Nothing, aX: false, P: false, bw: elm$core$Maybe$Nothing, bA: ''};
var author$project$Form$TextArea$view = function (_n0) {
	var state = _n0;
	return A2(author$project$Form$TextArea$View, state, author$project$Form$TextArea$Internal$initialViewState);
};
var author$project$Grid$Col = elm$core$Basics$identity;
var author$project$Grid$ColConfig = F3(
	function (defaultCols, sizes, children) {
		return {bM: children, cs: defaultCols, c9: sizes};
	});
var author$project$Grid$col = F2(
	function (cols, children) {
		return A3(author$project$Grid$ColConfig, cols, _List_Nil, children);
	});
var author$project$Grid$colSizes = F3(
	function (cols, sizes, children) {
		return A3(author$project$Grid$ColConfig, cols, sizes, children);
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
var author$project$Grid$Size$Lg = 3;
var author$project$Grid$Size$Md = 2;
var author$project$Grid$Size$Sm = 1;
var author$project$Grid$Size$Xl = 4;
var author$project$Grid$Size$Xs = 0;
var author$project$Grid$SizeHelpers$sizeAsList = _List_fromArray(
	[0, 1, 2, 3, 4]);
var rtfeldman$elm_css$Css$calcExpressionToString = function (expression) {
	if (!expression) {
		return '+';
	} else {
		return '-';
	}
};
var rtfeldman$elm_css$Css$calc = F3(
	function (firstExpr, expression, secondExpr) {
		var withoutCalcStr = function (l) {
			return A2(elm$core$String$startsWith, 'calc(', l.s) ? A2(elm$core$String$dropLeft, 4, l.s) : l.s;
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
		return {ci: 0, aq: 0, u: 0, a$: 0, aw: 0, R: 0, ax: 0, ay: 0, _: 0, aa: 0, G: 0, aF: 0, s: value};
	});
var rtfeldman$elm_css$Css$Subtraction = 1;
var rtfeldman$elm_css$Css$minus = 1;
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
					author$project$Grid$SizeHelpers$orderBySize(sizes)),
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
	var colConfig = _n0;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		!elm$core$List$isEmpty(colConfig.bM),
		_List_fromArray(
			[
				A2(author$project$Grid$Css$col, colConfig.cs, colConfig.c9)
			]),
		colConfig.bM);
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
var author$project$Grid$Size$Six = 5;
var author$project$Grid$Size$Twelve = 11;
var author$project$Html$Styled$Bdt$maybeView = F2(
	function (maybe, f) {
		if (maybe.$ === 1) {
			return rtfeldman$elm_css$Html$Styled$text('');
		} else {
			var a = maybe.a;
			return f(a);
		}
	});
var author$project$Modal$ModalBlock = elm$core$Basics$identity;
var author$project$Modal$ModalBlockConfig = F3(
	function (defaultCols, sizes, children) {
		return {bM: children, cs: defaultCols, c9: sizes};
	});
var author$project$Modal$block = F2(
	function (cols, children) {
		return A3(author$project$Modal$ModalBlockConfig, cols, _List_Nil, children);
	});
var author$project$Modal$Config = elm$core$Basics$identity;
var author$project$Modal$body = F2(
	function (modalBlocks, _n0) {
		var viewConfig = _n0;
		return _Utils_update(
			viewConfig,
			{a1: modalBlocks});
	});
var author$project$Modal$footer = F2(
	function (buttons, _n0) {
		var viewConfig = _n0;
		return _Utils_update(
			viewConfig,
			{aS: buttons});
	});
var author$project$Modal$header = F3(
	function (title, buttons, _n0) {
		var viewConfig = _n0;
		return _Utils_update(
			viewConfig,
			{aT: buttons, aU: title});
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
				A2(1602$elm_feather$FeatherIcons$toHtml, _List_Nil, 1602$elm_feather$FeatherIcons$x))
			]));
};
var author$project$Modal$Css$block = F2(
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
var author$project$Modal$renderModalBlock = function (_n0) {
	var modalBlockConfig = _n0;
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2(author$project$Modal$Css$block, modalBlockConfig.cs, modalBlockConfig.c9)
			]),
		modalBlockConfig.bM);
};
var rtfeldman$elm_css$Css$bottom = rtfeldman$elm_css$Css$prop1('bottom');
var rtfeldman$elm_css$Css$fixed = {aN: 0, a3: 0, bG: 0, s: 'fixed'};
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
var rtfeldman$elm_css$Css$VhUnits = 0;
var rtfeldman$elm_css$Css$vh = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'vh');
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
	return elm$core$List$isEmpty(list) ? {s: 'none'} : {
		s: A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				function ($) {
					return $.s;
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
	var value = _n0.s;
	return {
		j: 0,
		s: A2(
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
var rtfeldman$elm_css$Css$Structure$TypeSelector = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$Global$typeSelector = F2(
	function (selectorStr, styles) {
		var sequence = A2(rtfeldman$elm_css$Css$Structure$TypeSelectorSequence, selectorStr, _List_Nil);
		var sel = A3(rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, elm$core$Maybe$Nothing);
		return _List_fromArray(
			[
				rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
				A3(rtfeldman$elm_css$Css$Preprocess$StyleBlock, sel, _List_Nil, styles))
			]);
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
	var viewConfig = _n0;
	return A3(
		author$project$Html$Styled$Bdt$divIf,
		viewConfig.Q,
		_List_Nil,
		_List_fromArray(
			[
				author$project$Modal$Css$removeBodyScroll,
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Modal$Css$background,
						rtfeldman$elm_css$Html$Styled$Events$onClick(viewConfig.bk)
					]),
				_List_Nil),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						author$project$Modal$Css$modal(viewConfig.a5)
					]),
				_List_fromArray(
					[
						author$project$Modal$closeIcon(viewConfig.bk),
						A3(
						author$project$Html$Styled$Bdt$divIf,
						(viewConfig.aU !== '') || (!elm$core$List$isEmpty(viewConfig.aT)),
						_List_fromArray(
							[author$project$Modal$Css$header]),
						_List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										rtfeldman$elm_css$Html$Styled$text(viewConfig.aU)
									])),
								A2(
								rtfeldman$elm_css$Html$Styled$div,
								_List_Nil,
								A2(elm$core$List$map, author$project$Button$render, viewConfig.aT))
							])),
						A3(
						author$project$Html$Styled$Bdt$divIf,
						!elm$core$List$isEmpty(viewConfig.a1),
						_List_fromArray(
							[author$project$Modal$Css$body]),
						A2(elm$core$List$map, author$project$Modal$renderModalBlock, viewConfig.a1)),
						A3(
						author$project$Html$Styled$Bdt$divIf,
						!elm$core$List$isEmpty(viewConfig.aS),
						_List_fromArray(
							[author$project$Modal$Css$footer]),
						A2(elm$core$List$map, author$project$Button$render, viewConfig.aS))
					]))
			]));
};
var author$project$Modal$setSize = F2(
	function (size, _n0) {
		var viewConfig = _n0;
		return _Utils_update(
			viewConfig,
			{a5: size});
	});
var author$project$Modal$initialViewConfig = F2(
	function (isOpen, msg) {
		return {bk: msg, aS: _List_Nil, aT: _List_Nil, aU: '', Q: isOpen, a1: _List_Nil, a5: 2};
	});
var author$project$Modal$viewIf = function (isOpen) {
	return A2(
		elm$core$Basics$composeL,
		elm$core$Basics$identity,
		author$project$Modal$initialViewConfig(isOpen));
};
var author$project$Msg$AddGreenToaster = {$: 1};
var author$project$Msg$AddRedToaster = {$: 2};
var author$project$Msg$CloseLgModal = {$: 24};
var author$project$Msg$CloseSmModal = {$: 22};
var author$project$Msg$DisabledToggle = {$: 20};
var author$project$Msg$FloatInputMsg = function (a) {
	return {$: 5, a: a};
};
var author$project$Msg$InputMsg = function (a) {
	return {$: 3, a: a};
};
var author$project$Msg$IntInputMsg = function (a) {
	return {$: 4, a: a};
};
var author$project$Msg$OpenLgModal = {$: 23};
var author$project$Msg$OpenSmModal = {$: 21};
var author$project$Msg$TextAreaMsg = function (a) {
	return {$: 12, a: a};
};
var author$project$Msg$Toggle1 = {$: 18};
var author$project$Msg$Toggle2 = {$: 19};
var author$project$Msg$UpdateEmail = function (a) {
	return {$: 15, a: a};
};
var author$project$Msg$UpdateMaybeBLockSelect = function (a) {
	return {$: 25, a: a};
};
var author$project$Msg$UpdateName = function (a) {
	return {$: 13, a: a};
};
var author$project$Msg$UpdatePreferredGenre = function (a) {
	return {$: 16, a: a};
};
var author$project$MusicGenre$toLabel = function (genre) {
	switch (genre) {
		case 0:
			return 'Rock';
		case 1:
			return 'Metal';
		case 2:
			return 'Blues';
		case 3:
			return 'Jazz';
		case 4:
			return 'Pop';
		default:
			return 'Blackened Heavy progressive Alternative New-age Rockabilly Glam-core Retro-folk Neo-soul Acid-funk Doo-wop Electrical Dream-pop';
	}
};
var author$project$Toasters$Css$absoluteContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
			rtfeldman$elm_css$Css$right(
			rtfeldman$elm_css$Css$px(320)),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$px(20))
		]));
var author$project$Toasters$Css$fixedContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$fixed),
			rtfeldman$elm_css$Css$zIndex(
			rtfeldman$elm_css$Css$int(101))
		]));
var author$project$Toasters$Css$relativeContainer = rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var author$project$Toasters$Css$timerColor = function (toasterColor) {
	if (!toasterColor) {
		return rtfeldman$elm_css$Css$hex('387238');
	} else {
		return rtfeldman$elm_css$Css$hex('842520');
	}
};
var rtfeldman$elm_css$Css$borderBottomLeftRadius = rtfeldman$elm_css$Css$prop1('border-bottom-left-radius');
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
	if (!toasterColor) {
		return rtfeldman$elm_css$Css$hex('51a351');
	} else {
		return rtfeldman$elm_css$Css$hex('bd362f');
	}
};
var rtfeldman$elm_css$Css$boxShadow4 = rtfeldman$elm_css$Css$prop4('box-shadow');
var rtfeldman$elm_css$Css$Transitions$Opacity = 73;
var rtfeldman$elm_css$Css$Transitions$Transition = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$Transitions$durationTransition = F2(
	function (animation, duration) {
		return {bg: animation, bm: elm$core$Maybe$Nothing, bn: duration, bH: elm$core$Maybe$Nothing};
	});
var rtfeldman$elm_css$Css$Transitions$opacity = rtfeldman$elm_css$Css$Transitions$durationTransition(73);
var rtfeldman$elm_css$Css$Transitions$propToString = function (prop) {
	switch (prop) {
		case 0:
			return 'background';
		case 1:
			return 'background-color';
		case 2:
			return 'background-position';
		case 3:
			return 'background-size';
		case 4:
			return 'border';
		case 5:
			return 'border-bottom';
		case 6:
			return 'border-bottom-color';
		case 7:
			return 'border-bottom-left-radius';
		case 8:
			return 'border-bottom-right-radius';
		case 9:
			return 'border-bottom-width';
		case 10:
			return 'border-color';
		case 11:
			return 'border-left';
		case 12:
			return 'border-left-color';
		case 13:
			return 'border-left-width';
		case 14:
			return 'border-radius';
		case 15:
			return 'border-right';
		case 16:
			return 'border-right-color';
		case 17:
			return 'border-right-width';
		case 18:
			return 'border-top';
		case 19:
			return 'border-top-color';
		case 20:
			return 'border-top-left-radius';
		case 21:
			return 'border-top-right-radius';
		case 22:
			return 'border-top-width';
		case 23:
			return 'border-width';
		case 24:
			return 'bottom';
		case 25:
			return 'box-shadow';
		case 26:
			return 'caret-color';
		case 27:
			return 'clip';
		case 28:
			return 'clip-path';
		case 29:
			return 'color';
		case 30:
			return 'column-count';
		case 31:
			return 'column-gap';
		case 32:
			return 'column-rule';
		case 33:
			return 'column-rule-color';
		case 34:
			return 'column-rule-width';
		case 35:
			return 'column-width';
		case 36:
			return 'columns';
		case 37:
			return 'filter';
		case 38:
			return 'flex';
		case 39:
			return 'flex-basis';
		case 40:
			return 'flex-grow';
		case 41:
			return 'flex-shrink';
		case 42:
			return 'font';
		case 43:
			return 'font-size';
		case 44:
			return 'font-size-adjust';
		case 45:
			return 'font-stretch';
		case 46:
			return 'font-variation-settings';
		case 47:
			return 'font-weight';
		case 48:
			return 'grid-column-gap';
		case 49:
			return 'grid-gap';
		case 50:
			return 'grid-row-gap';
		case 51:
			return 'height';
		case 52:
			return 'left';
		case 53:
			return 'letter-spacing';
		case 54:
			return 'line-height';
		case 55:
			return 'margin';
		case 56:
			return 'margin-bottom';
		case 57:
			return 'margin-left';
		case 58:
			return 'margin-right';
		case 59:
			return 'margin-top';
		case 60:
			return 'mask';
		case 61:
			return 'mask-position';
		case 62:
			return 'mask-size';
		case 63:
			return 'max-height';
		case 64:
			return 'max-width';
		case 65:
			return 'min-height';
		case 66:
			return 'min-width';
		case 67:
			return 'object-position';
		case 68:
			return 'offset';
		case 69:
			return 'offset-anchor';
		case 70:
			return 'offset-distance';
		case 71:
			return 'offset-path';
		case 72:
			return 'offset-rotate';
		case 73:
			return 'opacity';
		case 74:
			return 'order';
		case 75:
			return 'outline';
		case 76:
			return 'outline-color';
		case 77:
			return 'outline-offset';
		case 78:
			return 'outline-width';
		case 79:
			return 'padding';
		case 80:
			return 'padding-bottom';
		case 81:
			return 'padding-left';
		case 82:
			return 'padding-right';
		case 83:
			return 'padding-top';
		case 84:
			return 'right';
		case 85:
			return 'tab-size';
		case 86:
			return 'text-indent';
		case 87:
			return 'text-shadow';
		case 88:
			return 'top';
		case 89:
			return 'transform';
		case 90:
			return 'transform-origin';
		case 91:
			return 'vertical-align';
		case 92:
			return 'visibility';
		case 93:
			return 'width';
		case 94:
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
		case 0:
			return 'ease';
		case 1:
			return 'linear';
		case 2:
			return 'ease-in';
		case 3:
			return 'ease-out';
		case 4:
			return 'ease-in-out';
		case 5:
			return 'step-start';
		case 6:
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
					var animation = _n0.bg;
					var duration = _n0.bn;
					var delay = _n0.bm;
					var timing = _n0.bH;
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
	return {$: 1, a: a};
};
var author$project$Toasters$Internal$item = function (toaster) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2(author$project$Toasters$Css$toaster, toaster.am, toaster.ag),
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
						rtfeldman$elm_css$Html$Styled$text(toaster.bT)
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2(author$project$Toasters$Css$timerBar, toaster.am, toaster.ag)
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
var author$project$Toasters$view = function (_n0) {
	var toasters = _n0;
	return author$project$Toasters$Internal$view(toasters);
};
var author$project$Toggle$Toggle = elm$core$Basics$identity;
var author$project$Toggle$isDisabled = F2(
	function (isDisabled_, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{aW: isDisabled_});
	});
var author$project$Toggle$label = F2(
	function (label_, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{bt: label_});
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
		return {$: 3, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$PseudoElement = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$pseudoElement = function (element) {
	return rtfeldman$elm_css$Css$Preprocess$WithPseudoElement(element);
};
var rtfeldman$elm_css$Css$after = rtfeldman$elm_css$Css$pseudoElement('after');
var rtfeldman$elm_css$Css$before = rtfeldman$elm_css$Css$pseudoElement('before');
var rtfeldman$elm_css$Css$block = {l: 0, s: 'block'};
var rtfeldman$elm_css$Css$inlineBlock = {l: 0, s: 'inline-block'};
var rtfeldman$elm_css$Css$Transitions$BackgroundColor = 1;
var rtfeldman$elm_css$Css$Transitions$backgroundColor = rtfeldman$elm_css$Css$Transitions$durationTransition(1);
var rtfeldman$elm_css$Css$Transitions$BorderColor = 10;
var rtfeldman$elm_css$Css$Transitions$borderColor = rtfeldman$elm_css$Css$Transitions$durationTransition(10);
var rtfeldman$elm_css$Css$Transitions$Margin = 55;
var rtfeldman$elm_css$Css$Transitions$margin = rtfeldman$elm_css$Css$Transitions$durationTransition(55);
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
	var config = _n0;
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
						A3(author$project$Toggle$Css$toggle, config.bR, config.aW, config.aX),
						A2(
						author$project$Html$Styled$Bdt$attributeIf,
						!config.aW,
						rtfeldman$elm_css$Html$Styled$Events$onClick(config.b6))
					]),
				_List_Nil),
				A2(
				rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[author$project$Toggle$Css$label]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text(config.bt)
					]))
			]));
};
var author$project$Toggle$initialConfig = F2(
	function (toggled, toggleMsg) {
		return {aW: false, aX: false, bR: toggled, bt: '', b6: toggleMsg};
	});
var author$project$Toggle$view = F2(
	function (toggled, msg) {
		return A2(author$project$Toggle$initialConfig, toggled, msg);
	});
var rtfeldman$elm_css$Html$Styled$p = rtfeldman$elm_css$Html$Styled$node('p');
var author$project$View$maybeBlockView = function (musicGenre) {
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
					'Selected: ' + author$project$MusicGenre$toLabel(musicGenre))
				]))
		]);
};
var justinmimbs$date$Date$fromRataDie = function (rd) {
	return rd;
};
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var justinmimbs$date$Date$RataDie$monthToName = function (m) {
	switch (m) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var justinmimbs$date$Date$RataDie$ordinalDay = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$RataDie$toOrdinalDate,
	function ($) {
		return $.bZ;
	});
var justinmimbs$date$Date$RataDie$monthToQuarter = function (m) {
	return ((justinmimbs$date$Date$RataDie$monthToNumber(m) + 2) / 3) | 0;
};
var justinmimbs$date$Date$RataDie$quarter = A2(elm$core$Basics$composeR, justinmimbs$date$Date$RataDie$month, justinmimbs$date$Date$RataDie$monthToQuarter);
var justinmimbs$date$Date$RataDie$daysBeforeWeekYear = function (y) {
	var jan4 = justinmimbs$date$Date$RataDie$daysBeforeYear(y) + 4;
	return jan4 - justinmimbs$date$Date$RataDie$weekdayNumber(jan4);
};
var elm$time$Time$Fri = 4;
var elm$time$Time$Mon = 0;
var elm$time$Time$Sat = 5;
var elm$time$Time$Sun = 6;
var elm$time$Time$Thu = 3;
var elm$time$Time$Tue = 1;
var elm$time$Time$Wed = 2;
var justinmimbs$date$Date$RataDie$numberToWeekday = function (wdn) {
	var _n0 = A2(elm$core$Basics$max, 1, wdn);
	switch (_n0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		default:
			return 6;
	}
};
var justinmimbs$date$Date$RataDie$toWeekDate = function (rd) {
	var wdn = justinmimbs$date$Date$RataDie$weekdayNumber(rd);
	var wy = justinmimbs$date$Date$RataDie$year(rd + (4 - wdn));
	var week1Day1 = justinmimbs$date$Date$RataDie$daysBeforeWeekYear(wy) + 1;
	return {
		dp: 1 + (((rd - week1Day1) / 7) | 0),
		dq: wy,
		ed: justinmimbs$date$Date$RataDie$numberToWeekday(wdn)
	};
};
var justinmimbs$date$Date$RataDie$weekNumber = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$RataDie$toWeekDate,
	function ($) {
		return $.dp;
	});
var justinmimbs$date$Date$RataDie$weekYear = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$RataDie$toWeekDate,
	function ($) {
		return $.dq;
	});
var justinmimbs$date$Date$RataDie$weekday = A2(elm$core$Basics$composeR, justinmimbs$date$Date$RataDie$weekdayNumber, justinmimbs$date$Date$RataDie$numberToWeekday);
var justinmimbs$date$Date$RataDie$weekdayToName = function (wd) {
	switch (wd) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var justinmimbs$date$Date$RataDie$ordinalSuffix = function (n) {
	var nn = A2(elm$core$Basics$modBy, 100, n);
	var _n0 = A2(
		elm$core$Basics$min,
		(nn < 20) ? nn : A2(elm$core$Basics$modBy, 10, nn),
		4);
	switch (_n0) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
var justinmimbs$date$Date$RataDie$withOrdinalSuffix = function (n) {
	return _Utils_ap(
		elm$core$String$fromInt(n),
		justinmimbs$date$Date$RataDie$ordinalSuffix(n));
};
var justinmimbs$date$Date$RataDie$formatField = F3(
	function (_char, length, rd) {
		switch (_char) {
			case 'y':
				if (length === 2) {
					return A2(
						elm$core$String$right,
						2,
						A3(
							elm$core$String$padLeft,
							2,
							'0',
							elm$core$String$fromInt(
								justinmimbs$date$Date$RataDie$year(rd))));
				} else {
					return A3(
						elm$core$String$padLeft,
						length,
						'0',
						elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$year(rd)));
				}
			case 'Y':
				if (length === 2) {
					return A2(
						elm$core$String$right,
						2,
						A3(
							elm$core$String$padLeft,
							2,
							'0',
							elm$core$String$fromInt(
								justinmimbs$date$Date$RataDie$weekYear(rd))));
				} else {
					return A3(
						elm$core$String$padLeft,
						length,
						'0',
						elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$weekYear(rd)));
				}
			case 'Q':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$quarter(rd));
					case 2:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$quarter(rd));
					case 3:
						return 'Q' + elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$quarter(rd));
					case 4:
						return justinmimbs$date$Date$RataDie$withOrdinalSuffix(
							justinmimbs$date$Date$RataDie$quarter(rd));
					case 5:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$quarter(rd));
					default:
						return '';
				}
			case 'M':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$monthNumber(rd));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							'0',
							elm$core$String$fromInt(
								justinmimbs$date$Date$RataDie$monthNumber(rd)));
					case 3:
						return A2(
							elm$core$String$left,
							3,
							justinmimbs$date$Date$RataDie$monthToName(
								justinmimbs$date$Date$RataDie$month(rd)));
					case 4:
						return justinmimbs$date$Date$RataDie$monthToName(
							justinmimbs$date$Date$RataDie$month(rd));
					case 5:
						return A2(
							elm$core$String$left,
							1,
							justinmimbs$date$Date$RataDie$monthToName(
								justinmimbs$date$Date$RataDie$month(rd)));
					default:
						return '';
				}
			case 'w':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$weekNumber(rd));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							'0',
							elm$core$String$fromInt(
								justinmimbs$date$Date$RataDie$weekNumber(rd)));
					default:
						return '';
				}
			case 'd':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$day(rd));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							'0',
							elm$core$String$fromInt(
								justinmimbs$date$Date$RataDie$day(rd)));
					case 3:
						return justinmimbs$date$Date$RataDie$withOrdinalSuffix(
							justinmimbs$date$Date$RataDie$day(rd));
					default:
						return '';
				}
			case 'D':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$ordinalDay(rd));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							'0',
							elm$core$String$fromInt(
								justinmimbs$date$Date$RataDie$ordinalDay(rd)));
					case 3:
						return A3(
							elm$core$String$padLeft,
							3,
							'0',
							elm$core$String$fromInt(
								justinmimbs$date$Date$RataDie$ordinalDay(rd)));
					default:
						return '';
				}
			case 'E':
				switch (length) {
					case 1:
						return A2(
							elm$core$String$left,
							3,
							justinmimbs$date$Date$RataDie$weekdayToName(
								justinmimbs$date$Date$RataDie$weekday(rd)));
					case 2:
						return A2(
							elm$core$String$left,
							3,
							justinmimbs$date$Date$RataDie$weekdayToName(
								justinmimbs$date$Date$RataDie$weekday(rd)));
					case 3:
						return A2(
							elm$core$String$left,
							3,
							justinmimbs$date$Date$RataDie$weekdayToName(
								justinmimbs$date$Date$RataDie$weekday(rd)));
					case 4:
						return justinmimbs$date$Date$RataDie$weekdayToName(
							justinmimbs$date$Date$RataDie$weekday(rd));
					case 5:
						return A2(
							elm$core$String$left,
							1,
							justinmimbs$date$Date$RataDie$weekdayToName(
								justinmimbs$date$Date$RataDie$weekday(rd)));
					case 6:
						return A2(
							elm$core$String$left,
							2,
							justinmimbs$date$Date$RataDie$weekdayToName(
								justinmimbs$date$Date$RataDie$weekday(rd)));
					default:
						return '';
				}
			case 'e':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$weekdayNumber(rd));
					case 2:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$RataDie$weekdayNumber(rd));
					default:
						return A3(justinmimbs$date$Date$RataDie$formatField, 'E', length, rd);
				}
			default:
				return '';
		}
	});
var justinmimbs$date$Date$RataDie$formatWithTokens = F2(
	function (tokens, rd) {
		return A3(
			elm$core$List$foldl,
			F2(
				function (token, formatted) {
					if (!token.$) {
						var _char = token.a;
						var length = token.b;
						return _Utils_ap(
							A3(justinmimbs$date$Date$RataDie$formatField, _char, length, rd),
							formatted);
					} else {
						var str = token.a;
						return _Utils_ap(str, formatted);
					}
				}),
			'',
			tokens);
	});
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {cm: col, cX: problem, c4: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.c4, p.cm, p.cX);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
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
		var parse = _n0;
		var _n1 = parse(
			{cm: 1, e: _List_Nil, f: 1, a: 0, c4: 1, w: src});
		if (!_n1.$) {
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
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var justinmimbs$date$Pattern$Literal = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0;
		return function (s0) {
			var _n1 = parseA(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				var _n2 = callback(a);
				var parseB = _n2;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
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
		};
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _n0 = thunk(0);
		var parse = _n0;
		return parse(s);
	};
};
var elm$parser$Parser$lazy = elm$parser$Parser$Advanced$lazy;
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
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
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
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
		};
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$parser$Parser$toToken = function (str) {
	return A2(
		elm$parser$Parser$Advanced$Token,
		str,
		elm$parser$Parser$Expecting(str));
};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {cm: col, dD: contextStack, cX: problem, c4: row};
	});
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.c4, s.cm, x, s.e));
	});
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.a, s.c4, s.cm, s.w);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cm: newCol, e: s.e, f: s.f, a: newOffset, c4: newRow, w: s.w});
	};
};
var elm$parser$Parser$token = function (str) {
	return elm$parser$Parser$Advanced$token(
		elm$parser$Parser$toToken(str));
};
var justinmimbs$date$Pattern$escapedQuote = A2(
	elm$parser$Parser$ignorer,
	elm$parser$Parser$succeed(
		justinmimbs$date$Pattern$Literal('\'')),
	elm$parser$Parser$token('\'\''));
var elm$parser$Parser$UnexpectedChar = {$: 11};
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.a, s.w);
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cm: 1, e: s.e, f: s.f, a: s.a + 1, c4: s.c4 + 1, w: s.w}) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cm: s.cm + 1, e: s.e, f: s.f, a: newOffset, c4: s.c4, w: s.w}));
		};
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
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
						A3(elm$core$String$slice, s0.a, s1.a, s0.w),
						a),
					s1);
			}
		};
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.w);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.a, offset) < 0,
					0,
					{cm: col, e: s0.e, f: s0.f, a: offset, c4: row, w: s0.w});
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
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.a, s.c4, s.cm, s);
	};
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$parser$Parser$Advanced$getOffset = function (s) {
	return A3(elm$parser$Parser$Advanced$Good, false, s.a, s);
};
var elm$parser$Parser$getOffset = elm$parser$Parser$Advanced$getOffset;
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var justinmimbs$date$Pattern$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var justinmimbs$date$Pattern$fieldRepeats = function (str) {
	var _n0 = elm$core$String$toList(str);
	if (_n0.b && (!_n0.b.b)) {
		var _char = _n0.a;
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(
					F2(
						function (x, y) {
							return A2(justinmimbs$date$Pattern$Field, _char, 1 + (y - x));
						})),
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$getOffset,
					elm$parser$Parser$chompWhile(
						elm$core$Basics$eq(_char)))),
			elm$parser$Parser$getOffset);
	} else {
		return elm$parser$Parser$problem('expected exactly one char');
	}
};
var justinmimbs$date$Pattern$field = A2(
	elm$parser$Parser$andThen,
	justinmimbs$date$Pattern$fieldRepeats,
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$chompIf(elm$core$Char$isAlpha)));
var justinmimbs$date$Pattern$finalize = A2(
	elm$core$List$foldl,
	F2(
		function (token, tokens) {
			var _n0 = _Utils_Tuple2(token, tokens);
			if (((_n0.a.$ === 1) && _n0.b.b) && (_n0.b.a.$ === 1)) {
				var x = _n0.a.a;
				var _n1 = _n0.b;
				var y = _n1.a.a;
				var rest = _n1.b;
				return A2(
					elm$core$List$cons,
					justinmimbs$date$Pattern$Literal(
						_Utils_ap(x, y)),
					rest);
			} else {
				return A2(elm$core$List$cons, token, tokens);
			}
		}),
	_List_Nil);
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var justinmimbs$date$Pattern$isLiteralChar = function (_char) {
	return (_char !== '\'') && (!elm$core$Char$isAlpha(_char));
};
var justinmimbs$date$Pattern$literal = A2(
	elm$parser$Parser$map,
	justinmimbs$date$Pattern$Literal,
	elm$parser$Parser$getChompedString(
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(0),
				elm$parser$Parser$chompIf(justinmimbs$date$Pattern$isLiteralChar)),
			elm$parser$Parser$chompWhile(justinmimbs$date$Pattern$isLiteralChar))));
var elm$parser$Parser$ExpectingEnd = {$: 10};
var elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			elm$core$String$length(s.w),
			s.a) ? A3(elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var justinmimbs$date$Pattern$quotedHelp = function (result) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$andThen,
				function (str) {
					return justinmimbs$date$Pattern$quotedHelp(
						_Utils_ap(result, str));
				},
				elm$parser$Parser$getChompedString(
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(0),
							elm$parser$Parser$chompIf(
								elm$core$Basics$neq('\''))),
						elm$parser$Parser$chompWhile(
							elm$core$Basics$neq('\''))))),
				A2(
				elm$parser$Parser$andThen,
				function (_n0) {
					return justinmimbs$date$Pattern$quotedHelp(result + '\'');
				},
				elm$parser$Parser$token('\'\'')),
				elm$parser$Parser$succeed(result)
			]));
};
var justinmimbs$date$Pattern$quoted = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(justinmimbs$date$Pattern$Literal),
		elm$parser$Parser$chompIf(
			elm$core$Basics$eq('\''))),
	A2(
		elm$parser$Parser$ignorer,
		justinmimbs$date$Pattern$quotedHelp(''),
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					elm$parser$Parser$chompIf(
					elm$core$Basics$eq('\'')),
					elm$parser$Parser$end
				]))));
var justinmimbs$date$Pattern$patternHelp = function (tokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$andThen,
				function (token) {
					return justinmimbs$date$Pattern$patternHelp(
						A2(elm$core$List$cons, token, tokens));
				},
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[justinmimbs$date$Pattern$field, justinmimbs$date$Pattern$literal, justinmimbs$date$Pattern$escapedQuote, justinmimbs$date$Pattern$quoted]))),
				elm$parser$Parser$lazy(
				function (_n0) {
					return elm$parser$Parser$succeed(
						justinmimbs$date$Pattern$finalize(tokens));
				})
			]));
};
var justinmimbs$date$Pattern$fromString = function (str) {
	return A2(
		elm$core$Result$withDefault,
		_List_fromArray(
			[
				justinmimbs$date$Pattern$Literal(str)
			]),
		A2(
			elm$parser$Parser$run,
			justinmimbs$date$Pattern$patternHelp(_List_Nil),
			str));
};
var justinmimbs$date$Date$RataDie$format = function (pattern) {
	var tokens = elm$core$List$reverse(
		justinmimbs$date$Pattern$fromString(pattern));
	return justinmimbs$date$Date$RataDie$formatWithTokens(tokens);
};
var justinmimbs$date$Date$RataDie$toIsoString = justinmimbs$date$Date$RataDie$format('yyyy-MM-dd');
var justinmimbs$date$Date$toIsoString = function (_n0) {
	var rd = _n0;
	return justinmimbs$date$Date$RataDie$toIsoString(rd);
};
var rtfeldman$elm_css$Html$Styled$h1 = rtfeldman$elm_css$Html$Styled$node('h1');
var author$project$View$view = function (model) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$map,
				author$project$Msg$ToastersMsg,
				author$project$Toasters$view(model.dh)),
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
								11,
								_List_fromArray(
									[
										_Utils_Tuple2(3, 5)
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
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Simple text Input')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$InputMsg,
																author$project$Form$Input$render(
																	author$project$Form$Input$view(model.Z))),
																A2(
																rtfeldman$elm_css$Html$Styled$div,
																_List_Nil,
																_List_fromArray(
																	[
																		rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + author$project$Form$Input$getValue(model.Z))
																	]))
															])),
														A2(
														author$project$Card$block,
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Int Input, accepting only ints!')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$IntInputMsg,
																author$project$Form$IntInput$render(
																	author$project$Form$IntInput$view(model.cH))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$IntInput$getValue(model.cH),
																function (_int) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + elm$core$String$fromInt(_int));
																})
															])),
														A2(
														author$project$Card$block,
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Float Input, accepting only floats!')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$FloatInputMsg,
																author$project$Form$FloatInput$render(
																	author$project$Form$FloatInput$view(model.cz))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$FloatInput$getValue(model.cz),
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
								11,
								_List_fromArray(
									[
										_Utils_Tuple2(3, 5)
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
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Simple Select')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$SelectMsg,
																author$project$Form$Select$render(
																	A2(
																		author$project$Form$Select$setIsOptionDisabled,
																		elm$core$Basics$eq(4),
																		A2(
																			author$project$Form$Select$setIsClearable,
																			true,
																			A2(author$project$Form$Select$view, model.c7, author$project$MusicGenre$toLabel))))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$Select$getSelectedOption(model.c7),
																function (musicGenre) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + author$project$MusicGenre$toLabel(musicGenre));
																})
															])),
														A2(
														author$project$Card$block,
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Multi Select')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$MultiSelectMsg,
																author$project$Form$MultiSelect$render(
																	A2(author$project$Form$MultiSelect$view, model.cP, author$project$MusicGenre$toLabel))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$Select$getSelectedOption(model.c7),
																function (musicGenre) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + author$project$MusicGenre$toLabel(musicGenre));
																})
															])),
														A2(
														author$project$Card$block,
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Search Select')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$SearchSelectMsg,
																author$project$Form$SearchSelect$render(
																	A2(
																		author$project$Form$SearchSelect$view,
																		model.c6,
																		function ($) {
																			return $.dV;
																		}))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$SearchSelect$getSelectedOption(model.c6),
																function (country) {
																	return rtfeldman$elm_css$Html$Styled$text('Value: ' + country.dV);
																})
															]))
													]),
												A3(author$project$Card$header, 'Example Selects', _List_Nil, author$project$Card$view))))
									])),
								A3(
								author$project$Grid$colSizes,
								11,
								_List_fromArray(
									[
										_Utils_Tuple2(3, 5)
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
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Simple Date Picker')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$DatePickerMsg,
																author$project$Form$DatePicker$render(
																	author$project$Form$DatePicker$view(model.co))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$DatePicker$getSelectedDate(model.co),
																function (date) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + justinmimbs$date$Date$toIsoString(date));
																})
															])),
														A2(
														author$project$Card$block,
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Date Picker with min and max dates')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$DatePicker2Msg,
																author$project$Form$DatePicker$render(
																	A2(
																		author$project$Form$DatePicker$setMaxDate,
																		elm$core$Maybe$Just(
																			justinmimbs$date$Date$fromRataDie(736296)),
																		A2(
																			author$project$Form$DatePicker$setMinDate,
																			elm$core$Maybe$Just(
																				justinmimbs$date$Date$fromRataDie(736194)),
																			A2(
																				author$project$Form$DatePicker$setIsClearable,
																				true,
																				author$project$Form$DatePicker$view(model.cp)))))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$DatePicker$getSelectedDate(model.cp),
																function (date) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + justinmimbs$date$Date$toIsoString(date));
																})
															])),
														A2(
														author$project$Card$block,
														11,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Date Time Picker!')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$DatePicker3Msg,
																author$project$Form$DatePicker$render(
																	A2(
																		author$project$Form$DatePicker$setIncludeTime,
																		true,
																		A2(
																			author$project$Form$DatePicker$setIsClearable,
																			true,
																			author$project$Form$DatePicker$view(model.cq))))),
																A2(
																author$project$Html$Styled$Bdt$maybeView,
																author$project$Form$DatePicker$getSelectedDate(model.cq),
																function (date) {
																	return rtfeldman$elm_css$Html$Styled$text(
																		'Value: ' + justinmimbs$date$Date$toIsoString(date));
																})
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
													11,
													_List_fromArray(
														[
															A2(
															rtfeldman$elm_css$Html$Styled$map,
															author$project$Msg$TextAreaMsg,
															author$project$Form$TextArea$render(
																author$project$Form$TextArea$view(model.df)))
														]))
												]),
											A3(author$project$Card$header, 'Text Area!', _List_Nil, author$project$Card$view)))
									])),
								A3(
								author$project$Grid$colSizes,
								11,
								_List_fromArray(
									[
										_Utils_Tuple2(3, 5)
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
														11,
														_List_fromArray(
															[
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Msg$AddGreenToaster,
																	author$project$Button$green(
																		A2(author$project$Button$text, 'Add Green Toaster', author$project$Button$view)))),
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Msg$AddRedToaster,
																	author$project$Button$red(
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
														11,
														_List_fromArray(
															[
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Msg$OpenSmModal,
																	A2(author$project$Button$text, 'Open Sm Modal', author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$onClick,
																	author$project$Msg$OpenLgModal,
																	A2(author$project$Button$text, 'Open Lg Modal', author$project$Button$view))),
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
																				11,
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
																				1,
																				A2(author$project$Modal$viewIf, model.cN, author$project$Msg$CloseSmModal)))))),
																author$project$Modal$render(
																A2(
																	author$project$Modal$footer,
																	_List_fromArray(
																		[
																			author$project$Button$red(
																			A2(
																				author$project$Button$onClick,
																				author$project$Msg$CloseLgModal,
																				A2(author$project$Button$text, 'Cancel', author$project$Button$view))),
																			author$project$Button$green(
																			A2(author$project$Button$text, 'Save', author$project$Button$view))
																		]),
																	A2(
																		author$project$Modal$body,
																		_List_fromArray(
																			[
																				A2(
																				author$project$Modal$block,
																				11,
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
																				3,
																				A2(author$project$Modal$viewIf, model.cM, author$project$Msg$CloseLgModal))))))
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
														11,
														_List_fromArray(
															[
																author$project$Grid$row(
																_List_fromArray(
																	[
																		A2(
																		author$project$Grid$col,
																		5,
																		_List_fromArray(
																			[
																				author$project$Toggle$render(
																				A2(author$project$Toggle$view, model.di, author$project$Msg$Toggle1)),
																				author$project$Toggle$render(
																				A2(
																					author$project$Toggle$label,
																					'Toggle Me',
																					A2(author$project$Toggle$view, model.dj, author$project$Msg$Toggle2))),
																				author$project$Toggle$render(
																				A2(
																					author$project$Toggle$label,
																					'Disabled',
																					A2(
																						author$project$Toggle$isDisabled,
																						true,
																						A2(author$project$Toggle$view, model.dk, author$project$Msg$DisabledToggle))))
																			]))
																	]))
															]))
													]),
												A3(author$project$Card$header, 'Toggle', _List_Nil, author$project$Card$view))))
									])),
								A3(
								author$project$Grid$colSizes,
								11,
								_List_fromArray(
									[
										_Utils_Tuple2(3, 5)
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
														11,
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
																author$project$Button$green(
																	A2(author$project$Button$text, 'Green!', author$project$Button$view))),
																author$project$Button$render(
																author$project$Button$red(
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
																	author$project$Button$green(
																		author$project$Button$small(
																			A2(author$project$Button$text, 'Small, green, loading!', author$project$Button$view))))),
																author$project$Button$render(
																A2(author$project$Button$icon, 1602$elm_feather$FeatherIcons$calendar, author$project$Button$view)),
																author$project$Button$render(
																A2(
																	author$project$Button$isDisabled,
																	true,
																	A2(author$project$Button$icon, 1602$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																author$project$Button$small(
																	A2(author$project$Button$icon, 1602$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																author$project$Button$green(
																	A2(author$project$Button$icon, 1602$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																author$project$Button$red(
																	A2(author$project$Button$icon, 1602$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$isLoading,
																	true,
																	A2(author$project$Button$icon, 1602$elm_feather$FeatherIcons$calendar, author$project$Button$view))),
																author$project$Button$render(
																A2(
																	author$project$Button$text,
																	'Google It',
																	A2(author$project$Button$href, 'http://google.com', author$project$Button$view)))
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
								11,
								_List_fromArray(
									[
										_Utils_Tuple2(3, 5)
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
													author$project$Button$red(author$project$Button$view)),
													A2(
													author$project$Button$text,
													'save',
													author$project$Button$green(author$project$Button$view))
												]),
											A2(
												author$project$Card$body,
												_List_fromArray(
													[
														A2(
														author$project$Card$block,
														5,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Name'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$UpdateName,
																author$project$Form$Input$render(
																	author$project$Form$Input$view(model.dV)))
															])),
														A2(
														author$project$Card$block,
														5,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Start Date'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$UpdateStartDate,
																author$project$Form$DatePicker$render(
																	author$project$Form$DatePicker$view(model.dc)))
															])),
														A2(
														author$project$Card$block,
														5,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Email'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$UpdateEmail,
																author$project$Form$Input$render(
																	author$project$Form$Input$view(model.ct)))
															])),
														A2(
														author$project$Card$block,
														5,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																A2(
																	author$project$Form$Label$mandatory,
																	true,
																	author$project$Form$Label$view('Country of Birth'))),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$UpdateCountryOfBirth,
																author$project$Form$SearchSelect$render(
																	A2(
																		author$project$Form$SearchSelect$view,
																		model.cn,
																		function ($) {
																			return $.dV;
																		})))
															])),
														A2(
														author$project$Card$block,
														5,
														_List_fromArray(
															[
																author$project$Form$Label$render(
																author$project$Form$Label$view('Preferred Music Genre')),
																A2(
																rtfeldman$elm_css$Html$Styled$map,
																author$project$Msg$UpdatePreferredGenre,
																author$project$Form$Select$render(
																	A2(author$project$Form$Select$view, model.cW, author$project$MusicGenre$toLabel)))
															]))
													]),
												A3(
													author$project$Card$header,
													'User Details',
													_List_fromArray(
														[
															A2(author$project$Button$icon, 1602$elm_feather$FeatherIcons$edit, author$project$Button$view)
														]),
													author$project$Card$view)))),
										author$project$Card$render(
										A2(
											author$project$Card$body,
											_List_fromArray(
												[
													A2(
													author$project$Card$block,
													5,
													_List_fromArray(
														[
															author$project$Form$Label$render(
															author$project$Form$Label$view('Preferred Music Genre')),
															A2(
															rtfeldman$elm_css$Html$Styled$map,
															author$project$Msg$UpdateMaybeBLockSelect,
															author$project$Form$Select$render(
																A2(
																	author$project$Form$Select$setIsClearable,
																	true,
																	A2(author$project$Form$Select$view, model.cL, author$project$MusicGenre$toLabel))))
														])),
													A3(
													author$project$Card$maybeBlock,
													5,
													author$project$Form$Select$getSelectedOption(model.cL),
													author$project$View$maybeBlockView)
												]),
											A3(author$project$Card$header, 'Conditional Blocks', _List_Nil, author$project$Card$view)))
									]))
							]))
					]))
			]));
};
var elm$browser$Browser$document = _Browser_document;
var rtfeldman$elm_css$Html$Styled$toUnstyled = rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var author$project$Main$main = elm$browser$Browser$document(
	{
		dP: elm$core$Basics$always(
			_Utils_Tuple2(author$project$Model$initialModel, elm$core$Platform$Cmd$none)),
		d8: author$project$Subscriptions$subscriptions,
		ea: author$project$Update$update,
		ec: function (model) {
			return {
				dx: _List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$toUnstyled(
						author$project$View$view(model))
					]),
				d9: 'Bdt-Elm Demo'
			};
		}
	});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));